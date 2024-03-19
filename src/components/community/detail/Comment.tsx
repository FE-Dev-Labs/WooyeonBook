'use client';
import styles from '@/styles/community/detail/DetailPage.module.css';
import { useState } from 'react';

const Comment = () => {
	const [createState, setCreateState] = useState(false);
	const handleState = () => {
		setCreateState(!createState);
	};
	return (
		<div>
			{/* header */}
			<div className={styles.commentHeader}>
				<div className={styles.commentCount}>댓글 ##</div>
				<div className={styles.commentSortWrap}>
					<button>좋아요순</button>
					<div className={styles.dot}>●</div>
					<button>최신순</button>
				</div>
			</div>
			{/* create  btn*/}
			<div className={styles.commentCreateWrap}>
				<button onClick={handleState}>###님, 댓글을 작성해보세요.</button>
			</div>
			{/* create box */}
			{createState && (
				<div className={styles.commentCreateBoxWrap}>
					<textarea />
					<div>
						<button>취소</button>
						<button>등록</button>
					</div>
				</div>
			)}
			{/* comment */}
			<div className={styles.commnetWrap}>
				<div className={styles.commentInfoWrap}>
					<div>
						<div>작성자</div>
						<div>작성일</div>
					</div>
					<div>
						<button>수정</button>
						<button>삭제</button>
					</div>
				</div>
				<div className={styles.commentContentWrap}>
					<p>
						댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용 댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
						댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용
					</p>
				</div>
				<div className={styles.contentBtnWrap}>
					<button>공유</button>
				</div>
				<hr />
			</div>
		</div>
	);
};

export default Comment;
