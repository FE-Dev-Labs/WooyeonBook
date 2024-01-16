import styles from '@/styles/common/bookItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import bookImage from '../../../public/main/book3.png';

interface BookItemProp {
	rank?: number;
}

export default function BookItem({ rank }: BookItemProp) {
	return (
		<div className={styles.bookItem}>
			{rank && <div className={styles.rank}>{rank}</div>}
			<Link href="/">
				<div className={styles.bookImage}>
					<Image
						src={bookImage}
						alt="new book"
						width={200}
						// layout="fill"
						// objectFit="cover"
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
	);
}
