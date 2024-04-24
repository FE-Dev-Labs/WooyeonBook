import styles from '@/styles/category/categoryView/categoryContents/categoryContents.module.css';
import { NewBookType } from '@/types/bookType';
import CategoryBookItemWrapper from './categoryBookItemWrapper/CategoryBookItemWrapper';
import Pagination from '@/components/common/Pagination';

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
			<CategoryBookItemWrapper data={data} />
			<Pagination
				dataLength={dataLength}
				page="category"
				categoryId={categoryId}
			/>
		</div>
	);
}
