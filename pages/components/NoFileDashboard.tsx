import { FileUploadProps } from "@/types";
import FileUpload from "./FileUpload"

const NoFileDashboard = ({ onFileUpload, isLoading }: FileUploadProps) => {
	return (
		<div className="px-4 py-16 sm:py-32 sm:ml-34 sm:flex sm:flex-col mt-16 text-center bg-backgroundlight">
			<h3 className="text-4xl font-semibold  p-2">DocReader</h3>
			<p className="">The fastest way to make sence of your documents.</p>
			<div className="flex flex-col sm:flex-row sm:w-2/3  self-center mt-16 ">
				<div className="flex flex-col mx-2 self-stretch">
					<h4 className="p-4">Examples</h4>
					<div className="flex flex-col basis-1/2 ">
						<p className="bg-surfaceColor py-4 px-6 my-1 rounded border border-gray-300">What is this book about?</p>
						<p className="bg-surfaceColor py-4 px-6 my-1 rounded border border-gray-300">Highlight the top most important points from the book.</p>
					</div>
				</div>
				<div className="flex flex-col  self-stretch">
					<h4 className="p-4">Limitations</h4>
					<div className="flex flex-col basis-1/22">
						<p className="bg-surfaceColor py-4 px-6 my-1 rounded border border-gray-300">Does not understand the concept of sections in the document.</p>
						<p className="bg-surfaceColor py-4 px-6 my-1 rounded border border-gray-300">May occassionally form opions about the books information.</p>
					</div>
				</div>
			</div>
			<div className="self-center p-4 sm:mt-16 sm:w-1/3 w-full">
				<FileUpload onFileUpload={onFileUpload} isLoading={isLoading} />
			</div>
		</div>
	)
}

export default NoFileDashboard;