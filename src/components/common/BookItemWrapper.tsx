import styles from '@/styles/common/bookItemWrapper.module.css';
import BookItem from '../common/BookItem';
import { NewBookType } from '@/types/newBookType';

interface BookItemWrapperProp {
	data: NewBookType[];
}

export default function BookItemWrapper({ data }: BookItemWrapperProp) {
	// const filteredData = data.filter(
	// 	(book) => book.categoryName.split('>')[1] === selectedCategory
	// );

	return (
		<div className={styles.bookItemWrapper}>
			{data?.map((book) => <BookItem key={book.itemId} data={book} />)}
		</div>
	);
}
