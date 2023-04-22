import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { createIndex, createNameSpace } from '../../utils'
import { NextApiHandler } from "next";

const handler: NextApiHandler = async (req, res) => {
	let indexResult = ""
	try {

		if (req.method === 'POST') {
			const file = req.body;
			const loader = new PDFLoader(file.filePath, {
				// you may need to add `.then(m => m.default)` to the end of the import
				pdfjs: () => import("pdf-parse/lib/pdf.js/v1.10.100/build/pdf.js"),
				splitPages: true
			});
		
			const docs = await loader.load()
			
			const regex = /[\n\s]+/g;
			// const documentName = file.filePath.match(/\/([^/]+)\.pdf$/)[1].toUpperCase()
			const documentName = await createNameSpace(file.filePath)
			
			docs.forEach(doc => {
				const cleanedText = doc.pageContent.replace(regex, " ");
				doc.pageContent = cleanedText
				doc.metadata = {
					pageNumber: doc.metadata.loc.pageNumber				
				}
			})
			
			const textSplitter = new RecursiveCharacterTextSplitter({
				chunkSize: 1500,
				chunkOverlap: 100
			});

	
			const chunks = await textSplitter.splitDocuments(docs)
		

			try {
				await createIndex(chunks, documentName)
				indexResult = "Successul indexed the document!"
			} catch (error) {
				indexResult = `${error}`
			}
		}
		res.json({
			successful: true,
			message: indexResult
		     })

	} catch (error) {
		res.json({
			successful: false,
			error: error
		     })
	}
}

export default handler;
