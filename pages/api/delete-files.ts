import { NextApiHandler } from "next";
import path from "path";
import fs from "fs";
import { createNameSpace } from "@/utils";
import { PineconeClient } from "@pinecone-database/pinecone";


const handler: NextApiHandler = async (req, res) => {
	const pdfDirectory = path.join(process.cwd(), 'public', 'pdfs')
	const client = new PineconeClient()
	await client.init({
		apiKey: process.env.PINECONE_API_KEY!,
		environment: process.env.PINECONE_ENV!
	})
	const index = client.Index(process.env.INDEX_NAME!)

	try {
		const files = await fs.promises.readdir(pdfDirectory)
		for(const file of files){
			console.log("starting deletion for: ", file)
			const filePath = path.join(pdfDirectory, file)
			const namespace = await createNameSpace(filePath)
			console.log("starting deletion for: ", namespace)
			const result = await index.delete1({
				deleteAll: true,
				namespace: namespace
			})
			await fs.promises.unlink(filePath)
			console.log("finished deletion for: ", result)
		}

		console.log("=====> successful deleted")
		res.json({
			successful: true,
			message: "Cleaning up is done."
		})
	} catch (error) {
		res.json({
			successful: false,
			message: `Something went wrong. ${error}`
		})
	}

}



export default handler;