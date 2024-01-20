import Category from '@/components/best/category/Category';
import BookItem from '@/components/common/BookItem';
import PageHeader from '@/components/common/PageHeader';
import Sort from '@/components/common/Sort';
import styles from '@/styles/best/best.module.css';

export default function bestPage() {
	let ranks = [];
	for (let i = 1; i <= 30; i++) {
		ranks.push(i);
	}

	return (
		<>
			<PageHeader title="베스트셀러" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<Category />
					<Sort />
					<div className={styles.rankBox}>
						{ranks.map((rank) => (
							<div className={styles.itemWrapper} key={rank}>
								<div className={styles.rank}>{rank}</div>
								<BookItem />
							</div>
						))}
					</div>
				</div>
			</div>
		</>
	);
}
