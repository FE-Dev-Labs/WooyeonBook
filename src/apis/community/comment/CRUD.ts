interface CommentData {
	id?: string;
	created_at: Date;
	comment: string;
	created_user: string;
	created_user_name: string;
	doc_id: string;
	check: boolean;
	like: number;
}

const fetchComments = async (doc_id: string) => {
	try {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/comment/detail/${doc_id}`,
			{
				cache: 'no-store',
			},
		);
		const comments: CommentData[] = await res.json();

		return comments;
	} catch (e) {
		return [];
	}
};

const createComment = async (postData: CommentData, doc_id: string) => {
	try {
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/comment/create/${doc_id}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(postData),
			},
		);
	} catch (e) {
		alert('오류가 발생했습니다.다시 시도해주세요.');
	}
};

const updateComments = async (updateData: CommentData, id: string) => {
	try {
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/comment/update/${id}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(updateData),
			},
		);
	} catch (e) {
		alert('오류가 발생했습니다.다시 시도해주세요.');
	}
};

const deleteComments = async (id: string) => {
	try {
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/comment/delete/${id}`,
			{
				method: 'DELETE',
			},
		);
	} catch (e) {
		alert('오류가 발생했습니다.다시 시도해주세요.');
	}
};

export { fetchComments, createComment, updateComments, deleteComments };
