import styles from '@/styles/layout/recentlyViewedBooks.module.css';
import Image from 'next/image';
import bookImage1 from '../../../public/main/book1.jpg';
import bookImage2 from '../../../public/main/book2.jpg';

export default function RecentlyViewedBooks() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.textWrapper}>최근 본 상품</div>
				<div className={styles.booksWrapper}>
					<Image src={bookImage1} alt="book" width={60} height={80} />
					<Image src={bookImage2} alt="book" width={60} height={80} />
				</div>
			</div>
		</div>
	);
}
