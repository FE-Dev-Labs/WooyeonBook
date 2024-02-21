import styles from '@/styles/common/bestSeller.module.css';
import BookItem from '@/components/common/BookItem';
import CategoryTitle from '../main/common/CategoryTitle';
import { BestSellerType } from '@/types/bestSellerType';

interface BestSellerProps {
	data: BestSellerType[];
	page?: string;
	height?: string;
}

export default function BestSeller({ data, page, height }: BestSellerProps) {
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
				// page="best"
				// mainTitle="베스트셀러"
				// subTitle="어떤 책을 많이 읽을까?"
				// page="best"
			/>
			<div className={styles.bestItemWrapper}>
				{data?.map((book: BestSellerType, index: number) => (
					<BookItem key={book.itemId} data={book} rank={index + 1} />
				))}
			</div>
		</div>
	);
}
