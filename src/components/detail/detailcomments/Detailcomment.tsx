import styles from '@/styles/detail/detailcomments/detailcomment.module.css';
import Detailcommentslist from './Detailcommentslist';
export default function Detailcomment() {
	return (
		<div className={styles.commentContainer}>
			<form className={styles.commentForm}>
				<input
					className={styles.commentInput}
					type="text"
					placeholder="한글 기준 50자까지 작성 가능합니다."
				/>

				<button className={styles.commnetSubmitBtn}>등록</button>
			</form>
			<div>
				<ul>
					{/*코멘트 list map 돌리는 부분 */}
					<Detailcommentslist />
					<Detailcommentslist />
				</ul>
			</div>
		</div>
	);
}
