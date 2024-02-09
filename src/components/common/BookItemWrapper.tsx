import styles from '@/styles/common/bookItemWrapper.module.css';
import BookItem from '../common/BookItem';

export default function BookItemWrapper() {
	return (
		<div className={styles.bookItemWrapper}>
			{/* {data.map((book: any) => (
				<div key={book.id}>{book.title}</div>
			))} */}
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
	);
}
