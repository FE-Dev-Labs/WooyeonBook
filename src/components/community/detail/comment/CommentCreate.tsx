'use client';
import { getUser } from '@/apis/community/getUser';
import styles from '@/styles/community/detail/DetailPage.module.css';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

const CommentCreate = ({ page, doc_id }: { page: string; doc_id: string }) => {
	const supabase = createClient();

	const [comment, setComment] = useState('');
	const onChangeText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setComment(e.target.value);
	};
	const [createState, setCreateState] = useState(false);
	const handleState = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (!user) {
			alert('로그인이 필요합니다.');
		} else {
			setCreateState(!createState);
		}
	};
	const createComment = async () => {
		const { user_id, user_name } = await getUser();
		const submitData = {
			created_at: new Date(),
			filed: page,
			comment: comment,
			created_user: user_id,
			created_user_name: user_name,
			check: false,
			doc_id: doc_id,
			like: 0,
		};
		const { error } = await supabase
			.from('comment')
			.insert(submitData)
			.select();
		if (error) {
			throw new Error('Error creating comment');
		}
		setCreateState(false);
		setComment('');
		window.location.reload();
	};
	const cancleComment = () => {
		setCreateState(false);
		setComment('');
	};
	return (
		<div>
			{/* create  btn client*/}
			{!createState && (
				<div className={styles.commentCreateWrap}>
					<button onClick={handleState}> 댓글을 작성해보세요.</button>
				</div>
			)}
			{/* create box client*/}
			{createState && (
				<div className={styles.commentCreateBoxWrap}>
					<textarea value={comment} onChange={onChangeText} />
					<div>
						<button onClick={cancleComment}>취소</button>
						<button onClick={createComment}>등록</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentCreate;
