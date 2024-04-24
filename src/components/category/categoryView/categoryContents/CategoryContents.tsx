import styles from '@/styles/category/categoryView/categoryContents/categoryContents.module.css';
import { NewBookType } from '@/types/bookType';
import Pagination from '@/components/common/Pagination';
import BookItemWrapper from '@/components/common/bookItem/BookItemWrapper';

interface CategoryContentsProps {
	categoryId: string;
	data: NewBookType[];
	dataLength: number;
}

export default function CategoryContents({
	categoryId,
	data,
	dataLength,
}: CategoryContentsProps) {
	return (
		<div className={styles.categoryContents}>
			{/* <CategorySlider /> */}
			{/* <SortBar categoryId={categoryId} page="category" /> */}
			<BookItemWrapper data={data} page="category" />
			<Pagination
				dataLength={dataLength}
				page="category"
				categoryId={categoryId}
			/>
		</div>
	);
}
