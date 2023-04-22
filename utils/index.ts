import { PineconeClient } from "@pinecone-database/pinecone";
import { Document } from "langchain/document";
import * as dotenv from "dotenv";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { Chroma } from "langchain/vectorstores/chroma";


dotenv.config()

export const openAIEmbeddings = new OpenAIEmbeddings({ openAIApiKey: process.env.OPEAI_API_KEY! })

export const createIndex = async (docs: Document[], pdfName: string) => {

	const client = new PineconeClient()

	await client.init({
		apiKey: process.env.PINECONE_API_KEY!,
		environment: process.env.PINECONE_ENV!
	})

	const index = client.Index(process.env.INDEX_NAME!)


	try {
		const result = await PineconeStore.fromDocuments(docs, openAIEmbeddings, { pineconeIndex: index, namespace: pdfName })
		// const vectorStore = await Chroma.fromDocuments(docs, openAIEmbeddings, {collectionName: pdfName})

	} catch (error) {
		console.log(`error: ${error}`)
	}


}

export const createNameSpace = async (pdfPath: string | null) => {
	let name = ""
	if (pdfPath !== null) {
		const nameWithoutExtension = pdfPath.replace(/\.[^/.]+$/, "");
		const cleanedName = nameWithoutExtension.replace(/[^a-z0-9]+|-{2,}|_+|[\\/]+|\s+/gi, "");
		name = cleanedName.length > 0 ? cleanedName : Math.random().toString(36).substring(2);
	}
	return name.slice(-30).toLocaleLowerCase();
}

const sleep = (ms: number): Promise<void> => {
	return new Promise(resolve => setTimeout(resolve, ms))
}

const waitForIndexToBeReady = async (condition: boolean, client: PineconeClient) => {
	while (!condition) {
		await sleep(1000);
		const updateIndexDescription = await client.describeIndex({
			indexName: process.env.INDEX_NAME!
		});
		if (updateIndexDescription.status?.ready == true) {
			condition = updateIndexDescription.status.ready == true
			break;
		}
	}

}



export const QueryTemplate = {
	SOFTWARE_ENGINEER: {
		character: "software-engineer",
		behavior: `
		You are a senior software engineer who has read the document in which some of the text provided as context come from.

		Given the following query, please answer it in details based on the context text with detailed answers. Feel free to use your vast knowledge 
		outside the context of the text provided to come up with code examples.

		If the query is related to the context text, at the end of your answer, finish with an excerpt of the most relevamt content directly 
		from the book.

		If the query is not related to the context text, decline politely.

		If the text has nothing to do with engineering, please let them know that you are not best suited to answer such questions and 
		suggest that they select the Smart Guy character.
		`
	},
	LEGAL_ASSISTANT: {
		character: "legal-assistant",
		behavior: `
		You are a knowledgable legal assistant who has read the provided document in which some of the text provided as context come from.

		Given the following query, please answer it in details based strictly on the text context provided. Please make your answer as detailed as possible.
		Answers should be authoritative and exhude confidence and quote the related law where and when necessary.
		
		If the query is not related to the context text, decline politely and mention that you're binded by law to only provide legal assistance based on the text.

		Always replay in first person.
		`
	},
	AUTODIDACT: {
		character: "smart-guy",
		behavior: `
		You are a knowledgable reader who has read the document in which some of the text provided as context come from.
		
		Given the following query, please answer it in details based strictly on the text provided. Answers should be as detailed as possible. 
		Answers should be authoritative and exhude confidence.  

		If the query is related to the context text, at the end of your answer, finish with a paraphrased quote of the author from the book \
		in the following format: As {author} says: {quote}

		If the query is not related to the context text or has anything to do with religion, reply with sarcasm because your job is only 
		to answer queries related to love.

		Always replay in first person.
	
		`
	}
}