import styles from '@/styles/common/bookItemWrapper.module.css';
import BookItem from '../common/BookItem';

export default function BookItemWrapper() {
	return (
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
	);
}
