import styles from '@/styles/common/bestSeller.module.css';
import BookItem from '@/components/common/BookItem';
import CategoryTitle from '../main/common/CategoryTitle';
import { BestSellerType } from '@/types/bookType';

interface BestSellerProps {
	data?: BestSellerType[];
	page?: string;
	height?: string;
	isUsedPage?: boolean;
}

export default function BestSeller({
	data,
	page,
	height,
	isUsedPage,
}: BestSellerProps) {
	return (
		<div className={styles.bestSellerWrapper} style={{ height }}>
			<CategoryTitle
				mainTitle={page === 'used' ? '중고 베스트셀러' : '베스트셀러'}
				subTitle={
					page === 'used'
						? '어떤 중고 책이 인기 있을까?'
						: '어떤 책을 많이 읽을까?'
				}
				page="best"
				isUsedPage={isUsedPage}
			/>
			<div className={styles.bestItemWrapper}>
				{data?.map((book: BestSellerType, index: number) => (
					<BookItem key={book.itemId} data={book} rank={index + 1} />
				))}
			</div>
		</div>
	);
}
