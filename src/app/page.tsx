import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import CategoryTitle from '../components/main/common/CategoryTitle';
import BookItemBox from '@/components/main/common/BookItemBox';
import bookImage from '../../public/main/book2.jpg';
import Image from 'next/image';
import Link from 'next/link';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import BookItem from '@/components/common/BookItem';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<NewBook />
				<ThemeRecommendation />
				<div className={styles.bestSellerWrapper}>
					<CategoryTitle
						mainTitle="베스트셀러"
						subTitle="어떤 책을 많이 읽을까?"
					/>
					<div className={styles.bestItemWrapper}>
						<BookItem rank={1} />
						<BookItem rank={2} />
						<BookItem rank={3} />
						<BookItem rank={4} />
						<BookItem rank={5} />
					</div>
				</div>
				<div className={styles.usedBookWrapper}>
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
