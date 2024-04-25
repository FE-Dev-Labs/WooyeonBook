interface CommentData {
	id: string;
	created_at: Date;
	comment: string;
	created_user: string;
	created_user_name: string;
	doc_id: string;
	check: boolean;
	like: number;
}
export async function fetchComments(doc_id: string) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/comment/detail/${doc_id}`,
		{
			cache: 'no-cache',
		},
	);
	const comments: CommentData[] = await res.json();
	return comments;
}
