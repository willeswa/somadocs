import { useState } from "react"

type SearchInputProps = {
	userText: string,
	onQuestionChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void,
	onSearch: (prompt: string | null) => void,
	isLoading: boolean
}
const SearchInput = ({ onSearch, onQuestionChange, userText, isLoading }: SearchInputProps) => {

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		
	}

	return <form className="fixed bottom-4 sm:bottom-10 sm:right-64 sm:w-2/5  sm:left-96 w-4/4 right-2 left-2 bg-white rounded-full" onSubmit={handleSubmit}>
		<label htmlFor="chat" className="sr-only">Your message</label>
		<div className="flex items-center px-1 py-1 rounded-full border  border-black-400">
			<textarea
				id="chat" rows={1}
				className="block mx-4 px-4 py-2 w-full text-sm text-black bg-gray-100 rounded-lg border border-gray-400 focus:ring-blue-100 focus:border-gray-100 dark:bg-gray-100 dark:border-gray-100 dark:placeholder-gray-400 dark:text-black dark:focus:ring-gray-100 dark:focus:border-blue-100"
				placeholder="Your message..."
				onChange={onQuestionChange}
				value={userText}>
			</textarea>
			<button 
			disabled={isLoading}
			type="submit" 
			className="inline-flex justify-center p-2 text-gray-600 rounded-full cursor-pointer hover:bg-blue-400 hover:text-blue-500 dark:hover:bg-gray-600"
			onClick={() => onSearch(userText)}>
				<svg aria-hidden="true" className="w-6 h-6 rotate-90" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
				<span className="sr-only">Send message</span>
			</button>
		</div>
	</form>



}

export default SearchInput;