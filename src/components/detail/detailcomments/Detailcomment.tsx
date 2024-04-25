'use client';

import styles from '@/styles/detail/detailComments/detailComment.module.css';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import uuid from 'react-uuid';
import { commentsType } from '@/types/detailComments';
import useCurrentUser from '../../../hooks/useCurrentUser';
import DetailCommentsList from './DetailCommentsList';

export default function DetailComment({ bookId }: { bookId: string }) {
	// 댓글
	const [comment, setComment] = useState<string>('');
	// 댓글 창
	const [isLogin, setIsLogin] = useState<boolean>(false);
	// 댓글 리스트
	const [commentsList, setCommentsList] = useState<commentsType[]>([]);
	// 글자 실시간 표시
	const [inputCount, setInputCount] = useState<number>(0);

	const supabase = createClient();

	// useCurrentUser  훅
	const { userName, userId } = useCurrentUser('');

	// 로그인 유뮤 체크
	useEffect(() => {
		if (document.cookie === null || document.cookie === '') {
			setIsLogin(false);
		} else {
			setIsLogin(true);
		}
	}, []);

	const hanldeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setComment(e.target.value);
		if (e.target.value.length > 50) {
			alert('50자 이내로 적어주세요');
		} else {
			setInputCount(e.target.value.length);
		}
	};
	// 댓글 추가
	const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const commentdata: commentsType = {
			id: uuid(),
			user_id: userId,
			book_id: bookId,
			user_name: userName,
			comment: comment,
			created_at: new Date(),
		};
		if (comment === '') {
			alert('댓글을 남겨주세요!');
		}
		if (comment.trim() !== '') {
			const { data, error } = await supabase
				.from('bookDetailComments')
				.insert([commentdata]);
			if (error) {
				console.log(error);
			} else {
				setComment('');
				setInputCount(0); // 댓글 글자수도 초기화
				// 댓글이 바로 달리지 않는 현상이 있었다
				// 댓글을 추가하면 바로 getCommentLists 함수 호출
				getCommentLists(); // 댓글 리스트를 새로 불러와서 업데이트
			}
		}
	};

	// 댓글 불러오기
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

	useEffect(() => {
		getCommentLists();
	}, []);

	return (
		<>
			{isLogin && (
				<>
					<form className={styles.commentForm} onSubmit={handleSumbit}>
						<input
							value={comment}
							className={styles.commentInput}
							type="text"
							placeholder="한글 기준 50자까지 작성 가능합니다."
							onChange={hanldeInputChange}
							maxLength={50}
						/>
						<button className={styles.commnetSubmitBtn}>등록</button>
					</form>
					<div className={styles.commentInputCount}>
						<span className={styles.commentInputCountTxt}>{inputCount}</span>
						<span className={styles.commentCount}>/50 자</span>
					</div>
				</>
			)}
			<div>
				<ul>
					{commentsList.map((list) => {
						return (
							<DetailCommentsList
								key={list.id}
								list={list}
								userId={userId}
								getCommentLists={getCommentLists}
							/>
						);
					})}
				</ul>
			</div>
		</>
	);
}
