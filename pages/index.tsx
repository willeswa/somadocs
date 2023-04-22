
import { useEffect, useState } from 'react'
import axios from 'axios';
import SideNavbar from './components/SideNavbar';
import NavigationBar from './components/NavigationBar';
import { Document } from 'langchain/document';
import Dashboard from './components/Dashboard';
import ToastMessage from './components/ToastMessage';



export default function Home() {

  const [fileName, setSelectedPdfName] = useState<string|null>(null)
  const [userText, setUserText] = useState<string>("");
  const [reply, setReply] = useState<string | null>(null);
  const [step, setStep] = useState<string | null>(null);
  const [resourceDocuments, setResourceDocuments] = useState<Document[] | null>(null)
  const [userQuery, setUserQuery] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState<Array<string>[]>([])

  const Personalities =  {
    legal: "legal-assistant",
    knowledgable: "smart-guy",
    technical: "software-engineer"
  }
  

  const getFiles = async () => {
    const { data } = await axios.post("/api/get-pdfs")
    if(data.successful){
      console.log(data.results)
      setEntries(data.results)
      if(data.results.length > 0){
        setSelectedPdfName(createNameSpace(data.results[0]))
      }
    }
  }

  useEffect(() => {
    getFiles()
  },[])

  
  const handleSearch = async (prompt: string | null) => {
   setIsLoading(true)
    const question = {
      prompt: prompt,
      character: Personalities.knowledgable,
      pdfName: fileName  
    }
    const headers = {
      'Content-Type': 'application/json'
    }
    setResourceDocuments(null)
    setUserQuery(prompt)
    setStep(`Searching for answers from...${fileName}`)
   
    const { data } = await axios.post("/api/search-pdf", question, { headers })

    if (data.successful) {
      setReply(data.reply.text)
      setResourceDocuments(data.reply.sourceDocuments)
      setStep(null)
      setUserText("")
    }
    setIsLoading(false)
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setUserText(event.target.value)
  }



  const createNameSpace = (pdfPath: string | null) => {
    let name = ""
    if(pdfPath !== null){
      const nameWithoutExtension = pdfPath.replace(/\.[^/.]+$/, "");
      const cleanedName = nameWithoutExtension.replace(/[^a-z0-9]+|-{2,}|_+|[\\/]+|\s+/gi, "");
      name = cleanedName.length > 0 ? cleanedName : Math.random().toString(36).substring(2);
    }
    return name.slice(-30).toLocaleLowerCase();
  }

  const handleUpload = async (file: File) => {
    setIsLoading(true);
    setResourceDocuments(null)
    setStep("Cleaning up documents...")
    setUserQuery(null)
    const deleteResult = await axios.get("/api/delete-files")
    if(deleteResult.data.successful){
      try {
        if (!file) return;
        const formData = new FormData();
        formData.append("pdf", file)
  
        setStep("Uploading your document...")
        const results = await axios.post("/api/upload-pdf", formData);
        if (results.data.successful) {
          const file = {
            filePath: results.data.filePath,
          };
  
          const headers = {
            'Content-Type': 'application/json',
          };
  
          const docName =  createNameSpace(results.data.filePath)
          setSelectedPdfName(docName)
          setStep("AI is making sense of the document...")
          const {data} = await axios.post('/api/create-index', file, {headers})
  
          if(data.successful){
            setStep("Done! AI is now ready to answer your questions.")
            setIsLoading(false)
          }
        }
  
      } catch (error) {
        console.log(error)
        setIsLoading(false)
      }
    }
    
  }

  return (
    <main className='bg-backgroundlight h-full'>
      <NavigationBar/>
      <Dashboard 
      entries={entries}
      setUserQuery={setUserQuery}
      isLoading={isLoading}
      documentName={fileName}
      userQuery={userQuery}
      hasFiles={fileName !== null}
      step={step}
      onFileUpload={handleUpload} 
      onSearch={handleSearch} 
      onQuestionChange={handleInputChange} 
      userText={userText} 
      languageReply={reply} 
      sourceDocuments={resourceDocuments}
     />
    </main>
  )
}
