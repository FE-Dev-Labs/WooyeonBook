import styles from '@/styles/community/contentBox.module.css';

interface ContentBoxProps {
	page?: string;
}

export default function ContentBox({ page }: ContentBoxProps) {
	return (
		<div>
			<div className={styles.container}>
				{!page ? (
					<h2 className={styles.title}>title</h2>
				) : (
					<div className={styles.titleWrap}>
						<div className={styles.contentState}>모집중</div>
						<h2 className={styles.title}>title</h2>
					</div>
				)}

				{/* <h2 className={styles.title}>title</h2> */}
				<div className={styles.content}>
					contentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontentcontent
				</div>
				<div className={styles.contnetInfoWrap}>
					<div className={styles.authorAndDateWrap}>
						<div>작성자</div>
						<div className={styles.dot}>●</div>
						<div>작성일</div>
					</div>
					<div className={styles.activityCounters}>
						<div>좋아요</div>
						<div>view</div>
						<div>댓글</div>
					</div>
				</div>
			</div>
		</div>
	);
}
