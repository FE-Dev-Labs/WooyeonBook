import BookItem from '@/components/common/BookItem';
import styles from '@/styles/best/rank.module.css';

export default function Rank() {
	let ranks = [];
	for (let i = 1; i <= 30; i++) {
		ranks.push(i);
	}

	return (
		<div className={styles.rankBox}>
			{ranks.map((rank) => (
				<div className={styles.itemWrapper} key={rank}>
					<div className={styles.rank}>{rank}</div>
					<BookItem />
				</div>
			))}
		</div>
	);
}
