import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import Title from '../components/main/Title';
import BookItemBox from '@/components/main/BookItemBox';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<div className={styles.newBooksWrapper}>
					<Title mainTitle="신간도서" subTitle="새로 나온 책 뭐가 있지?" />
					<BookItemBox />
				</div>
			</div>
		</main>
	);
}
