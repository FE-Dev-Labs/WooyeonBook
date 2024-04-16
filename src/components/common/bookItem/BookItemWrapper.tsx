import styles from '@/styles/common/bookItem/bookItemWrapper.module.css';
import { NewBookType, UsedBookType } from '@/types/bookType';
import BookItem from './BookItem';

interface BookItemWrapperProp {
	data: NewBookType[] | UsedBookType[];
}

export default function BookItemWrapper({ data }: BookItemWrapperProp) {
	return (
		<div className={styles.bookItemWrapper}>
			{data?.map((book) => <BookItem key={book.itemId} data={book} />)}
		</div>
	);
}
