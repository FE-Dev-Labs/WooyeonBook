import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import CategoryTitle from '../components/main/CategoryTitle';
import BookItemBox from '@/components/main/BookItemBox';
import bookImage from '../../public/main/book2.jpg';
import Image from 'next/image';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<div className={styles.newBooksWrapper}>
					<CategoryTitle
						mainTitle="신간도서"
						subTitle="새로 나온 책 뭐가 있지?"
					/>
					<BookItemBox />
				</div>
				<div className={styles.themeRecommendationWrapper}>
					<CategoryTitle
						mainTitle="테마추천"
						subTitle="어떤 테마의 책이 있을까?"
					/>
					<div className={styles.themeBox}>
						<div className={styles.themeItem}>
							<Image
								src={bookImage}
								alt="theme book"
								width={150}
								height={200}
							/>
						</div>
					</div>
				</div>
				<div className={styles.bestSellerWrapper}>
					<CategoryTitle
						mainTitle="베스트셀러"
						subTitle="어떤 책을 많이 읽을까?"
					/>
				</div>
				<div className={styles.usedBooksWrapper}>
					<CategoryTitle
						mainTitle="중고도서"
						subTitle="지구를 위해 중고도서 어떠세요?"
					/>
					<BookItemBox />
				</div>
			</div>
		</main>
	);
}
