import styles from '@/styles/common/bestSeller.module.css';
import BookItem from '@/components/common/BookItem';
import CategoryTitle from '../main/common/CategoryTitle';

interface BestSellerProps {
	data: any;
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
				{/* <BookItem rank={1} />
				<BookItem rank={2} />
				<BookItem rank={3} />
				<BookItem rank={4} />
				<BookItem rank={5} /> */}
			</div>
		</div>
	);
}
