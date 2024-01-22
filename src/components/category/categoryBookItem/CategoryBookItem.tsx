import styles from '@/styles/category/categoryBookItem/categoryBookItem.module.css';
import SortBar from './SortBar';
import BookItem from '@/components/common/BookItem';
import Pagination from '@/components/common/Pagination';

export default function CategoryBookItem() {
	return (
		<div className={styles.CategoryBookItemWrapper}>
			<SortBar />
			<div className={styles.BookItemWrapper}>
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
				<BookItem />
				<BookItem />
				<BookItem />
				<BookItem />
				<BookItem />
				<BookItem />
				<BookItem />
				<BookItem />
			</div>
			<div className={styles.paginationBox}></div>
			<Pagination />
		</div>
	);
}
