import BookItem from '../common/BookItem';
import styles from '@/styles/main/common/bookItemBox.module.css';

export default function BookItemBox() {
	return (
		<div className={styles.bookItemWrapper}>
			<BookItem />
			<BookItem />
			<BookItem />
			<BookItem />
			<BookItem />
			<BookItem />
		</div>
	);
}
