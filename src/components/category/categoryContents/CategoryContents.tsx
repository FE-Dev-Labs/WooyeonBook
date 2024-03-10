import styles from '@/styles/category/categoryContents/categoryContents.module.css';
import SortBar from './SortBar';
import CategoryBookItemBox from './CategoryBookItemBox';
import Pagination from '@/components/common/Pagination';
import CategorySlider from './categorySlider/CategorySlider';
import { NewBookType } from '@/types/bookType';

interface CategoryConentsProp {
	data: NewBookType[];
	itemLength: number;
	handleClickPage: (page: number) => void;
	selectedNumRef: React.RefObject<number>;
	currentPage: number;
}

export default function CategoryContents({
	data,
	itemLength,
	handleClickPage,
	selectedNumRef,
	currentPage,
}: CategoryConentsProp) {
	return (
		<div className={styles.categoryContents}>
			{/* <CategorySlider /> */}
			<SortBar />
			<CategoryBookItemBox data={data} />
			<Pagination
				itemLength={itemLength}
				handleClickPage={handleClickPage}
				currentPage={currentPage}
				selectedNumRef={selectedNumRef}
			/>
		</div>
	);
}
