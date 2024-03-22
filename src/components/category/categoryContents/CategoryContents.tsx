import styles from '@/styles/category/categoryContents/categoryContents.module.css';
import SortBar from './SortBar';
import CategoryBookItemBox from './CategoryBookItemBox';
import Pagination from '@/components/common/Pagination';
import CategorySlider from './categorySlider/CategorySlider';
import { NewBookType } from '@/types/bookType';
import NewPagintion from '@/components/common/NewPagintion';

interface CategoryConentsProp {
	data: NewBookType[];
	pageLength: number;
	// 	itemLength: number;
	// 	handlePageNumClick: (page: number) => void;
	// 	currentPage: number;
}

export default function CategoryContents({
	data,
	pageLength,
	// itemLength,
	// handlePageNumClick,
	// currentPage,
}: CategoryConentsProp) {
	return (
		<div className={styles.categoryContents}>
			{/* <CategorySlider /> */}
			<SortBar />
			<CategoryBookItemBox data={data} />
			<NewPagintion pageLength={pageLength} />
			{/* <Pagination
				itemLength={itemLength}
				handlePageNumClick={handlePageNumClick}
				currentPage={currentPage}
			/> */}
		</div>
	);
}
