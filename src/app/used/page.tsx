import Category from '@/components/best/category/Category';
import BookItem from '@/components/common/BookItem';
import Pageheader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
import styles from '@/styles/used/used.module.css';

export default function usedPage() {
	return (
		<>
			<Pageheader title="중고도서" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<Category />
					<Sort />
					<div className={styles.usedWrapper}>
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
						<BookItem />
					</div>
					<Pagination />
				</div>
			</div>
		</>
	);
}
