import { PineconeClient } from "@pinecone-database/pinecone"
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { RetrievalQAChain } from "langchain/chains";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import * as dotenv from "dotenv";
import { OpenAI } from "langchain";
import { QueryTemplate, openAIEmbeddings } from "@/utils";
import { CallbackManager } from "langchain/callbacks";


dotenv.config();


type HandlerCallback = (message: string) => void;

const handler: NextApiHandler = async (req, res) => {
	try {
		const body = req.body;
		const character = body.character;
		const pdfName = body.pdfName

		const client = new PineconeClient()
		console.log("initialize pine cone")
		await client.init({
			apiKey: process.env.PINECONE_API_KEY!,
			environment: process.env.PINECONE_ENV!
		})

		console.log("query the vector store", pdfName)
		const pineconeIndex = client.Index(process.env.INDEX_NAME!)
		const vectorStore = await PineconeStore.fromExistingIndex(openAIEmbeddings, { pineconeIndex, namespace: pdfName })
		const chat = new OpenAI({
			openAIApiKey: process.env.OPEAI_API_KEY!,
			temperature: 0,
			streaming: true,
			callbackManager: CallbackManager.fromHandlers({
				async handleLLMNewToken(token: string) {
					// update ui here with token
				},
			})

		})

		const chain = RetrievalQAChain.fromLLM(chat, vectorStore.asRetriever(5), {
			returnSourceDocuments: true
		})

		let query = ""

		switch (character) {
			case "senior-engineer":
				query = `${QueryTemplate.SOFTWARE_ENGINEER.behavior}

					query: ${body.prompt}`
				break;
			case "legal-assistant":
				query = `${QueryTemplate.LEGAL_ASSISTANT.behavior}

					query: ${body.prompt}`
			default:
				query = `${QueryTemplate.AUTODIDACT.behavior} 

					query: ${body.prompt}`
				break;
		}


		const response = await chain.call({
			query: query,
			maxTokens: 0
			
		})

		res.json({
			reply: response,
			successful: true
		})

	} catch (error) {
		res.json({
			reply: null,
			successful: false,
			error: error
		})
	}

}

export default handler;