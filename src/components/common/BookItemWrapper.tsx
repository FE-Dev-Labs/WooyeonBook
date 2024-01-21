import styles from '@/styles/common/bookItemWrapper.module.css';
import BookItem from '../common/BookItem';

export default function BookItemWrapper() {
	return (
		<div className={styles.bookItemWrapper}>
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
