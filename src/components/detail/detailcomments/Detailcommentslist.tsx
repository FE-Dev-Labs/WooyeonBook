'use client';
import styles from '@/styles/detail/detailcomments/detailcommentlist.module.css';
import { commentsType } from '@/types/detailComments';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';

interface commentListType {
	list: commentsType;
	getCommentLists: any;
	userId: string;
}
export default function Detailcommentslist({
	list,
	userId,
	getCommentLists,
}: commentListType) {
	const supabase = createClient();
	const [isEditing, setIsEditing] = useState<boolean>(false);
	const [editingComment, setEditingComment] = useState(list.comment);

	// 숫자가 문자열로 넘어옴 객체로 변환해서 toLocalDateString()메소드를 사용할 수 변환
	const listdate = new Date(list.created_at);

	const commentId = list.id;

	const handleSubmitEdit = () => {
		setIsEditing(true);
	};

	// 댓글 인풋
	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setEditingComment(e.target.value);
	};
	// 댓글 수정
	const handleModifyCommnet = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userId === list.user_id) {
			try {
				const { data, error } = await supabase
					.from('bookDetailComments')
					.update({ comment: editingComment })
					.eq('id', commentId)
					.select();
				if (error) {
					console.log(error);
				} else {
					setIsEditing(false);
					getCommentLists();
				}
			} catch (error) {
				console.log(error);
			}
		}
	};

	// 댓글 삭제
	const handleCommentDelete = async () => {
		// confirm을 사용하여 사용자의 응답을 yes에 할당합니다.
		const yes = confirm('정말 삭제하겠습니까?');

		// 사용자가 '확인'을 클릭한 경우에만 삭제 로직을 실행합니다.
		if (yes && userId === list.user_id) {
			try {
				const { data, error } = await supabase
					.from('bookDetailComments')
					.delete()
					.eq('id', commentId);
				if (error) {
					console.error(error);
				} else {
					setIsEditing(false); // 편집 상태 해제
					getCommentLists(); // 댓글 목록을 다시 가져옵니다.
				}
			} catch (error) {
				console.error(error);
			}
		}
	};
	return (
		<li className={styles.commentListWrapper}>
			<div className={styles.commentListUserSelection}>
				<span className={styles.commentListUserName}>{list.user_name}</span>
				<em className={styles.divice}></em>
				<span className={styles.commentListDate}>
					{listdate.toLocaleDateString()}
				</span>
			</div>
			{isEditing ? (
				<form onSubmit={handleModifyCommnet}>
					<div className={styles.commentModifyWrapper}>
						<input
							className={styles.commentInput}
							type="text"
							value={editingComment}
							onChange={handleInputChange}
						/>
						<div className={styles.commentModifySelection}>
							<button className={styles.modifyBtn}>완료</button>
							<em className={styles.divice}></em>
							<button className={styles.deleteBtn}>취소</button>
						</div>
					</div>
				</form>
			) : (
				<div className={styles.commentModifyWrapper}>
					<span>{list.comment}</span>
					{userId === list.user_id ? (
						<div className={styles.commentModifySelection}>
							<button className={styles.modifyBtn} onClick={handleSubmitEdit}>
								수정
							</button>
							<em className={styles.divice}></em>
							<button
								className={styles.deleteBtn}
								onClick={handleCommentDelete}>
								삭제
							</button>
						</div>
					) : (
						<></>
					)}
				</div>
			)}
		</li>
	);
}
