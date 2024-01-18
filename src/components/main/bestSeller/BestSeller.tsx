import styles from '@/styles/main/bestSeller/bestSeller.module.css';
import CategoryTitle from '../common/CategoryTitle';
import BookItem from '@/components/common/BookItem';

export default function BestSeller() {
	return (
		<div className={styles.bestSellerWrapper}>
			<CategoryTitle mainTitle="베스트셀러" subTitle="어떤 책을 많이 읽을까?" />
			<div className={styles.bestItemWrapper}>
				<BookItem rank={1} />
				<BookItem rank={2} />
				<BookItem rank={3} />
				<BookItem rank={4} />
				<BookItem rank={5} />
			</div>
		</div>
	);
}
