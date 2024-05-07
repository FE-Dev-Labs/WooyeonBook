import styles from '@/styles/community/contentSkeleton.module.css';

const BookContentSkeletonUi = () => {
	return (
		<div className={styles.skeletonDataWrapper}>
			<div className={styles.skeletonWrapper}>
				<div className={styles.skeletonImgArea}>
					<div className={styles.skeletonImg} />
				</div>

				<div className={styles.skeletonDataWrap}>
					<h3 className={styles.skeletonTitle}></h3>
					<p className={styles.skeletonReportContent}></p>
					<div className={styles.skeletonFooter}></div>
				</div>
			</div>
		</div>
	);
};

export default BookContentSkeletonUi;
