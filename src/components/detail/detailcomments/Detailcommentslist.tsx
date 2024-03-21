'use client';
import styles from '@/styles/detail/detailcomments/detailcommentlist.module.css';
import { commentsType } from '@/types/detailComments';

interface commentListType {
	list: commentsType;
}
export default function Detailcommentslist({ list }: commentListType) {
	// 숫자가 문자열로 넘어옴 객체로 변환해서 toLocalDateString()메소드를 사용할 수 변환
	const listdate = new Date(list.created_at);

	return (
		<li className={styles.commentListWrapper}>
			<div className={styles.commentListUserSelection}>
				<span className={styles.commentListUserName}>{list.user_name}</span>
				<em className={styles.divice}></em>
				<span className={styles.commentListDate}>
					{listdate.toLocaleDateString()}
				</span>
			</div>
			<span>{list.comment}</span>
		</li>
	);
}
