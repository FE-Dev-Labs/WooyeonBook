'use client';

import styles from '@/styles/detail/detailcomments/detailcommentlist.module.css';
export default function Detailcommentslist() {
	return (
		<li className={styles.commentListWrapper}>
			<div className={styles.commentListUserSelection}>
				<span className={styles.commentListUserName}>박진양</span>
				<em className={styles.divice}></em>
				<span className={styles.commentListDate}>2024.01.24</span>
			</div>
			<span>
				잔잔한 토요일 새벽에 혼자 읽기 시작한 책. 그래로 운동을 가지 않고
				읽었더라면 좋았을 것 만 같은, 혼자만의 시간에 어울리는 따뜻하고 감수성
				넘치는 이야기.
			</span>
		</li>
	);
}
