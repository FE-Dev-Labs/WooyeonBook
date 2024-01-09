import styles from '@/styles/layout/recentlyViewedBooks.module.css';

export default function RecentlyViewedBooks() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.textWrapper}>최근 본 상품</div>
				<div className={styles.booksWrapper}>
					<div>Books</div>
					<div>Books</div>
					<div>Books</div>
				</div>
			</div>
		</div>
	);
}
