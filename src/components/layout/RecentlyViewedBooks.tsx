import styles from '@/styles/layout/recentlyViewedBooks.module.css';
import Image from 'next/image';
import bookImage1 from '../../../public/main/book1.jpg';
import bookImage2 from '../../../public/main/book2.jpg';
import arrowLeftIcon from '../../../public/common/arrowLeft.png';
import arrowRightIcon from '../../../public/common/arrowRight.png';

export default function RecentlyViewedBooks() {
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.textWrapper}>최근 본 상품</div>
				<div className={styles.booksWrapper}>
					<Image src={bookImage1} alt="book" width={60} height={80} />
					<Image src={bookImage1} alt="book" width={60} height={80} />
					<Image src={bookImage1} alt="book" width={60} height={80} />
				</div>
				<div className={styles.buttonWrapper}>
					<div>
						<Image src={arrowLeftIcon} alt="arrow" width={20} height={20} />
					</div>
					<p className={styles.buttonNumber}>1/3</p>
					<div>
						<Image src={arrowRightIcon} alt="arrow" width={20} height={20} />
					</div>
				</div>
			</div>
		</div>
	);
}
