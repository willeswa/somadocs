
type ReplyProps = {
	reply: string | null
}

const SearchReply = ({reply}: ReplyProps) => { 
	console.log(reply)

	return <div>
		<p>{reply}</p>
	</div>
}

export default SearchReply;