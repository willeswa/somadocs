
import { NextApiHandler } from 'next';
import fs from 'fs';
import path from 'path';

const handler: NextApiHandler = async (req, res) => {
	try {
		const publicDir = path.join(process.cwd(), 'public', 'pdfs');
		try {
		  fs.accessSync(publicDir);
		} catch (err) {
		  // directory doesn't exist
		  fs.mkdirSync(publicDir);
		}
		const files = await fs.promises.readdir(publicDir);
	  res.status(200).json({ 
		successful: true,
		results: files });
	} catch (error) {
	  res.status(500).json({ error: error });
	}
    };
    
    export default handler;