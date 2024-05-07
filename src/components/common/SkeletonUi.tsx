import styles from '@/styles/community/contentSkeleton.module.css';

const ScalatonUi = () => {
	return (
		<div className={styles.skeletonDataWrapper}>
			<div className={styles.skeletonWrapper}>
				<div className={styles.skeletonDataWrap}>
					<div className={styles.contentState}></div>
					<h3 className={styles.skeletonTitle}></h3>
					<p className={styles.skeletonContent}></p>
					<div className={styles.skeletonFooter}></div>
				</div>
			</div>
		</div>
	);
};

export default ScalatonUi;
