import styles from '@/styles/common/bookItemWrapper.module.css';
import BookItem from '../common/BookItem';
import { NewBookType } from '@/types/bookType';

interface BookItemWrapperProp {
	data: NewBookType[];
}

export default function BookItemWrapper({ data }: BookItemWrapperProp) {
	return (
		<div className={styles.bookItemWrapper}>
			{data?.map((book) => <BookItem key={book.itemId} data={book} />)}
		</div>
	);
}
