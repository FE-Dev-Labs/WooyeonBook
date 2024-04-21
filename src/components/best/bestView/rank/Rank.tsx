import styles from '@/styles/best/bestView/Rank/rank.module.css';
import { BestSellerType } from '@/types/bookType';
// import BookItem from '../common/bookItem/BookItem';
import BookItem from '@/components/common/bookItem/BookItem';

interface RankProp {
	data: BestSellerType[];
}

export default function Rank({ data }: RankProp) {
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
