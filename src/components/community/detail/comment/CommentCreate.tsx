'use client';
import { getUser } from '@/apis/community/getUser';
import styles from '@/styles/community/detail/detailPage.module.css';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

const CommentCreate = ({ page, doc_id }: { page: string; doc_id: string }) => {
	const supabase = createClient();

	const [comment, setComment] = useState('');
	// 글자 실시간 표시
	const [inputCount, setInputCount] = useState<number>(0);
	const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setComment(e.target.value);
		if (e.target.value.length > 50) {
			alert('50자 이내로 적어주세요');
		} else {
			setInputCount(e.target.value.length);
		}
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
		setInputCount(0); // 댓글 글자수도 초기화
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
					<input
						type="text"
						placeholder="한글 기준 50자까지 작성 가능합니다."
						onFocus={handleState}
						className={styles.commentInput}
						maxLength={50}
					/>
				</div>
			)}
			{/* create box client*/}
			{createState && (
				<div className={styles.commentCreateBoxWrap}>
					<input
						type="text"
						placeholder="한글 기준 50자까지 작성 가능합니다."
						value={comment}
						onChange={onChangeText}
						maxLength={50}
					/>
					<div>
						<div className={styles.commentInputCount}>
							<span className={styles.commentInputCountTxt}>{inputCount}</span>
							<span className={styles.commentCount}>/50 자</span>
						</div>
						<button onClick={cancleComment}>취소</button>
						<button onClick={createComment}>등록</button>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentCreate;
