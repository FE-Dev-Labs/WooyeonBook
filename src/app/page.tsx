import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import Link from 'next/link';
import Image from 'next/image';
import bookImage from '../../public/main/book3.png';
import Title from '../components/main/Title';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<div className={styles.newBooksWrapper}>
					<Title mainTitle="신간도서" subTitle="새로 나온 책 뭐가 있지?" />
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
