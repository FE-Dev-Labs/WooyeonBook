import BookItem from '@/components/common/bookItem/BookItem';
import styles from '@/styles/category/categoryContents/categoryBookItemBox.module.css';
import { NewBookType } from '@/types/bookType';

interface CategoryBookItemBoxProp {
	data: NewBookType[];
}

export default function CategoryBookItemBox({ data }: CategoryBookItemBoxProp) {
	return (
		<div className={styles.categorybookItemWrapper}>
			{data?.map((book: NewBookType) => (
				<BookItem key={book.itemId} data={book} />
			))}
		</div>
	);
}
