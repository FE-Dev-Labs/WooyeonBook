import BookItem from '@/components/common/BookItem';
import styles from '@/styles/category/categoryContents/categoryBookItemBox.module.css';
import { NewBookType } from '@/types/bookType';

interface CategoryBookItemBoxProp {
	data: NewBookType[];
}

export default function CategoryBookItemBox({ data }: CategoryBookItemBoxProp) {
	return (
		<div className={styles.CategorybookItemWrapper}>
			{data?.map((book) => <BookItem key={book.itemId} data={book} />)}
		</div>
	);
}
