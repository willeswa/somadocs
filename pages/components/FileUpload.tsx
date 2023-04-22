import { FileUploadProps } from "@/types";

const FileUpload = ({ onFileUpload, isLoading }: FileUploadProps) => {

	return (
		<div className='flex items-center border border-gray-400 shadow justify-center h-12 w-full sm:basis-1/3 rounded-full bg-surfaceColor hover:border-gray-500 hover:text-black text-gray-400'>

			<label htmlFor="fileUploader">
				<input 
				disabled={isLoading}
				type="file" id='fileUploader' hidden onChange={({ target }) => {
					if (target.files) {
						const file = target.files[0];
						onFileUpload(file)
					}
				}} />

				<p className='text-center'>Upload PDF</p>

			</label>
			{/* <button className='rounded-full border border-violet-700 px-4 py-2 my-4 hover:bg-gray-200 w-40' onClick={onFileUpload} disabled={isUploading || selectedPdf == null} style={{ opacity: isUploading || selectedPdf == null ? ".1" : ".5", background: isUploading || selectedPdf == null ? "" : "violet" }}>Upload</button> */}

		</div>
	)
}

export default FileUpload;