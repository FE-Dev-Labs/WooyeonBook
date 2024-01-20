import styles from '@/styles/used/used.module.css';
import BookItem from '../common/BookItem';

export default function Used() {
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
