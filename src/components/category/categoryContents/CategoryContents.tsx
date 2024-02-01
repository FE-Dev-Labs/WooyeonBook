import styles from '@/styles/category/categoryContents/CategoryContents.module.css';
import SortBar from './SortBar';
import CategoryBookItemBox from './CategoryBookItemBox';
import Pagination from '@/components/common/Pagination';
import CategorySlider from './categorySlider/CategorySlider';

export default function CategoryContents() {
	return (
		<div className={styles.CategoryContents}>
			<CategorySlider />
			<SortBar />
			<CategoryBookItemBox />
			<Pagination />
		</div>
	);
}
