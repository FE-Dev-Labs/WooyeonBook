import { commentsType } from '@/types/detailComments';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

const useGetCommentLists = (bookId: string, commentId: string) => {
	const [commentsList, setCommentsList] = useState<commentsType[]>([]);
	const supabase = createClient();

	useEffect(() => {
		getCommentLists();
		// 의존성 배열에 bookId를 추가하여 bookId가 변경될 때마다 댓글 목록을 새로 불러옵니다.
	}, [bookId, commentId]);

	const getCommentLists = async () => {
		const { data, error } = await supabase
			.from('bookDetailComments')
			.select('*')
			.eq('book_id', bookId)
			// 최신 순으로 가져옴
			.order('created_at', { ascending: false });
		if (error) {
			console.log(error);
		} else {
			setCommentsList(data);
		}
	};
	return {
		commentsList,
		getCommentLists,
	};
};
export default useGetCommentLists;
