import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import Link from 'next/link';
import Image from 'next/image';
import bookImage from '../../public/main/book3.png';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<div className={styles.newBooksWrapper}>
					<div className={styles.titleWrapper}>
						<div className={styles.titleName}>
							<h1>신간도서</h1>
							<p>새로 나온 책 뭐가 있지?</p>
						</div>
						<div>
							<p className={styles.seeAll}>전체보기</p>
						</div>
					</div>
					<div className={styles.bookItemWrapper}>
						<div className={styles.bookItem}>
							<Link href="/">
								<div className={styles.bookImage}>
									<Image
										src={bookImage}
										alt="new books"
										width={200}
										height={275}
									/>
								</div>
							</Link>
							<div className={styles.bookText}>
								<Link href="/">
									<h1>베르베르씨, 오늘은 뭘 쓰세요?</h1>
								</Link>
								<p>베르베르 / 상상스퀘어</p>
								<p>10,700원 [10% 할인]</p>
							</div>
						</div>
						<div className={styles.bookItem}>
							<Link href="/">
								<div className={styles.bookImage}>
									<Image
										src={bookImage}
										alt="new books"
										width={200}
										height={275}
									/>
								</div>
							</Link>
							<div className={styles.bookText}>
								<Link href="/">
									<h1>베르베르씨, 오늘은 뭘 쓰세요?</h1>
								</Link>
								<p>베르베르 / 상상스퀘어</p>
								<p>10,700원 [10% 할인]</p>
							</div>
						</div>
						<div className={styles.bookItem}>
							<Link href="/">
								<div className={styles.bookImage}>
									<Image
										src={bookImage}
										alt="new books"
										width={200}
										height={275}
									/>
								</div>
							</Link>
							<div className={styles.bookText}>
								<Link href="/">
									<h1>베르베르씨, 오늘은 뭘 쓰세요?</h1>
								</Link>
								<p>베르베르 / 상상스퀘어</p>
								<p>10,700원 [10% 할인]</p>
							</div>
						</div>
						<div className={styles.bookItem}>
							<Link href="/">
								<div className={styles.bookImage}>
									<Image
										src={bookImage}
										alt="new books"
										width={200}
										height={275}
									/>
								</div>
							</Link>
							<div className={styles.bookText}>
								<Link href="/">
									<h1>베르베르씨, 오늘은 뭘 쓰세요?</h1>
								</Link>
								<p>베르베르 / 상상스퀘어</p>
								<p>10,700원 [10% 할인]</p>
							</div>
						</div>
						<div className={styles.bookItem}>
							<Link href="/">
								<div className={styles.bookImage}>
									<Image
										src={bookImage}
										alt="new books"
										width={200}
										height={275}
									/>
								</div>
							</Link>
							<div className={styles.bookText}>
								<Link href="/">
									<h1>베르베르씨, 오늘은 뭘 쓰세요?</h1>
								</Link>
								<p>베르베르 / 상상스퀘어</p>
								<p>10,700원 [10% 할인]</p>
							</div>
						</div>
						<div className={styles.bookItem}>
							<Link href="/">
								<div className={styles.bookImage}>
									<Image
										src={bookImage}
										alt="new books"
										width={200}
										height={275}
									/>
								</div>
							</Link>
							<div className={styles.bookText}>
								<Link href="/">
									<h1>베르베르씨, 오늘은 뭘 쓰세요?</h1>
								</Link>
								<p>베르베르 / 상상스퀘어</p>
								<p>10,700원 [10% 할인]</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</main>
	);
}
