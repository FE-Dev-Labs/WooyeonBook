import styles from '@/styles/best/bestView/Rank/rank.module.css';
import { BestSellerType } from '@/types/bookType';
import dynamic from 'next/dynamic';
import BookItemSkeleton from '@/components/common/bookItem/BookItemSkeleton';

interface RankProp {
	data: BestSellerType[];
}

const DynamicBookItem = dynamic(
	() => import('@/components/common/bookItem/BookItem'),
	{
		loading: () => <BookItemSkeleton />,
	},
);

export default function Rank({ data }: RankProp) {
	return (
		<div className={styles.rankBox}>
			{data?.map((book) => (
				<div className={styles.itemWrapper} key={book.itemId}>
					<div className={styles.rank}>{book.bestRank}</div>
					<DynamicBookItem data={book} />
				</div>
			))}
		</div>
	);
}
