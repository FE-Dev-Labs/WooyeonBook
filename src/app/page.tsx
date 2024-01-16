import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import Link from 'next/link';
import Image from 'next/image';
import bookImage from '../../public/main/book3.png';
import Title from '../components/main/Title';
import BookItem from '@/components/common/BookItem';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<div className={styles.newBooksWrapper}>
					<Title mainTitle="신간도서" subTitle="새로 나온 책 뭐가 있지?" />
					<div className={styles.bookItemWrapper}>
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
					</div>
				</div>
			</div>
		</main>
	);
}
