// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import formidable from 'formidable';
import fs  from 'fs/promises';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import path from 'path';

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile  = (req: NextApiRequest, saveLocally: boolean): Promise<{fields: formidable.Fields, files: formidable.Files}> => {
  const options: formidable.Options = {};

  if(saveLocally){
    options.uploadDir = path.join(process.cwd(), "/public/pdfs");
    options.filename = (name, ext, path, form) => {
      return Date.now().toString() + "_" + path.originalFilename
    }
  }

  const form = formidable(options)
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if(err) reject(err)
      resolve({fields, files})
    })
  })
}

const handler: NextApiHandler = async (req, res) => {
 try {
  await fs.readdir(path.join(process.cwd() + "/public", "/pdfs"));
 } catch (error) {
  await fs.mkdir(path.join(process.cwd() + "/public", "/pdfs"))
 }

 try {
  const {files} = await readFile(req, true);
  res.json({
    successful: true,
    filePath: files.pdf.filepath
   })
 } catch (error) {
  res.json({
    successful: false,
    filePath: null,
    error: error
   })
 }

};


export default handler;
