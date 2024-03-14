import BookItem from '@/components/common/BookItem';
import styles from '@/styles/best/rank.module.css';
import { BestSellerType, UsedBookType } from '@/types/bookType';

interface RankProp {
	data: BestSellerType[];
}

export default function Rank({ data }: RankProp) {
	console.log(data);

	return (
		<div className={styles.rankBox}>
			{data?.map((book) => (
				<div className={styles.itemWrapper} key={book.itemId}>
					<div className={styles.rank}>{book.bestRank}</div>
					<BookItem data={book} />
				</div>
			))}
		</div>
	);
}
