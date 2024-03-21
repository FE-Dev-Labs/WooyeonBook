'use client';
import Detailcommentslist from './Detailcommentslist';
import styles from '@/styles/detail/detailcomments/detailcomment.module.css';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import uuid from 'react-uuid';
import { commentsType } from '@/types/detailComments';

export default function Detailcomment({ bookId }: { bookId: string }) {
	// 댓글
	const [comment, setComment] = useState<string>('');
	// 댓글 창
	const [isLogin, setIsLogin] = useState<boolean>(false);
	// 유저 이름
	const [useName, setUseName] = useState<string>('');
	// 유저 id
	const [userId, setUserId] = useState<string>('');
	// 댓글 리스트
	const [commentsList, setCommentsList] = useState<commentsType[]>([]);

	const supabase = createClient();

	// 현재 유저의 정보 불러오기
	const getUser = async () => {
		const {
			data: { user },
			error,
		} = await supabase.auth.getUser();

		// 사용자 ID 접근
		if (user) {
			const userid = user.id;
			setUserId(userid);
			//사용자 이름 접근
			const username = user?.user_metadata.name;
			setUseName(username);
		} else {
			console.log(error);
		}
	};

	// 로그인 유뮤 체크
	useEffect(() => {
		getUser();
		if (document.cookie === null || document.cookie === '') {
			setIsLogin(false);
		} else {
			setIsLogin(true);
		}
	}, []);

	// 댓글 추가
	const handleSumbit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const commentdata: commentsType = {
			id: uuid(),
			user_id: userId,
			book_id: bookId,
			user_name: useName,
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
			}
		}
	};

	// 댓글 불러오기
	const getCommentLists = async () => {
		const { data, error } = await supabase
			.from('bookDetailComments')
			.select('*')
			.eq('book_id', bookId);
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
				<form className={styles.commentForm} onSubmit={handleSumbit}>
					<input
						value={comment}
						className={styles.commentInput}
						type="text"
						placeholder="한글 기준 50자까지 작성 가능합니다."
						onChange={(e) => setComment(e.target.value)}
					/>
					<button className={styles.commnetSubmitBtn}>등록</button>
				</form>
			)}
			<div>
				<ul>
					{commentsList.map((list) => {
						return <Detailcommentslist key={list.id} list={list} />;
					})}
				</ul>
			</div>
		</>
	);
}
