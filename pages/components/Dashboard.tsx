import { randomUUID } from "crypto";
import FileUpload from "./FileUpload";
import SearchInput from "./SearchInput";
import { Document } from "langchain/document";
import NoFileDashboard from "./NoFileDashboard";
import LoadingButton from "./LoadingButton";
import SideNavbar from "./SideNavbar";
import ContentLazyLoader from "./ContentLazyLoader";

type DashboardProps = {
	onFileUpload: (file: File) => void,
	onSearch: (prompt: string | null) => void,
	onQuestionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
	userText: string,
	languageReply: string | null,
	sourceDocuments: Document[] | null,
	step: string | null,
	hasFiles: boolean,
	userQuery: string | null,
	documentName: string | null,
	isLoading: boolean,
	setUserQuery: (prompt: string) => void,
	entries: Array<string>[]
}

const Dashboard = ({
	onFileUpload,
	onSearch,
	onQuestionChange,
	setUserQuery,
	userText,
	languageReply,
	sourceDocuments,
	step,
	hasFiles = true,
	userQuery,
	documentName,
	isLoading,
	entries }: DashboardProps) => {

	const handleClick = (event: React.MouseEvent<HTMLParagraphElement>) => {
		const text = (event.target as HTMLParagraphElement).innerText;
		onSearch(text)
		setUserQuery(text)
	};



	return (
		<div className="flex sm:flex-row flex-col">
			<SideNavbar entries={entries} />
			<div className="sm:w-4/5  min-h-screen">
				{hasFiles ? <div className="px-4 sm:ml-34 sm:flex sm:flex-row py-20">
					<div className="sm:basis-3/5">
						<div className="flex sm:items-stretch sm:flex-row flex-col mb-4">
							<>{isLoading ? <div className="bg-white rounded px-4 py-3 sm:basis-2/3 sm:mr-2 sm:my-auto border border-gray-400 my-4"><LoadingButton step={step} /> </div> : documentName ? <p className="bg-white rounded px-4 py-3 sm:basis-2/3 sm:mr-2 sm:my-auto border border-gray-400 my-4">
								You are currently reading: {documentName?.toLocaleLowerCase()}
							</p> : <></>}</>
							<FileUpload onFileUpload={onFileUpload} isLoading={isLoading} />
						</div>
						{userQuery ? <div className="flex flex-col items-left justify-left rounded bg-surfaceColor border border-1 border-gray-400 shadow-md">
							<p className="px-4 py-2 font-bold border border-b-1 border-t-0 border-x-0 rounded-t bg-white">{userQuery}</p>
							{isLoading ? <ContentLazyLoader />: languageReply ? <p className="p-4 ">{languageReply}</p> : <></>}

						</div> : <div className="border border-gray-400 bg-surfaceColor rounded">
							{!isLoading ? <>
							<h3 className="px-4 py-3 bg-white rounded-t">You can start asking AI questions about your document. Try the following...</h3>
							<p
								className="font-normal text-gray-400 hover:text-gray-900 px-4 py-3 block max-w-sm m-4 bg-white border border-gray-400 rounded hover:border-gray-900 hover:cursor-pointer"
								onClick={handleClick}
							>
								What is this document about?</p>
							</> : <ContentLazyLoader />}
						</div>}
						<SearchInput onQuestionChange={onQuestionChange} onSearch={onSearch} userText={userText} isLoading={isLoading} />
					</div>
					{sourceDocuments?.length ? <div className="sm:basis-2/5 bg-backgroundlight sm:mx-4 sm:my-4 my-16 rounded border border-gray-400 h-full">
						<h3 className="font-bold bg-white border border-b-1 border-t-0 border-x-0 px-4 py-2 rounded-t">Exerpts from the Document</h3>
						<div className="flex flex-col">
							{sourceDocuments?.map(item => (
								<div className="flex flex-col hover:border-gray-400 hover:border-x-0 hover:border-y-0 hover:border-l-8 last:rounded-b border-l-8 border-surfaceColor last:border-b-0 bg-surfaceColor hover:bg-gray-200 border border-t-0 border-b-1 border-b-gray-300 ">
									<p
										key={item.pageContent}
										className="p-4 ">
										{item.pageContent}
									</p>
									<p className="p-4 self-end text-xs font-bold uppercase">Exerpt is from page {item.metadata.pageNumber}</p>
								</div>

							))}
						</div>
					</div> : <></>}
				</div> : <NoFileDashboard isLoading={isLoading} onFileUpload={onFileUpload} />}
			</div>
		</div>
	)
}

export default Dashboard;