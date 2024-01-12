import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import Link from 'next/link';
import Image from 'next/image';
import bookImage from '../../public/main/book1.jpg';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<div className={styles.newBooksWrapper}>
					<div className={styles.titleWrapper}>
						<div className={styles.titleNameWrapper}>
							<h1>신간도서</h1>
							<p>새로 나온 책 뭐가 있지?</p>
						</div>
						<div>
							<p className={styles.seeAll}>전체보기</p>
						</div>
					</div>
					<div className={styles.contents}>
						<Link href="/">
							<div className={styles.bookImage}>
								<Image
									src={bookImage}
									alt="new books"
									width={200}
									height={275}
								/>
							</div>

							<div>
								<h1>책 이름</h1>
								<p>작가명 / 출판사명</p>
								<p>10,700원 [10% 할인]</p>
							</div>
						</Link>
					</div>
				</div>
			</div>
		</main>
	);
}
