import styles from '@/styles/common/bookItem/bookItemSkeleton.module.css';

export default function BookItemSkeleton() {
	return (
		<div className={styles.skeletonWrapper}>
			<div className={styles.bookSkeleton} />
			<div className={styles.titleSkeleton} />
			<div className={styles.textSkeleton} />
			<div className={styles.subTextSkeleton} />
		</div>
	);
}
