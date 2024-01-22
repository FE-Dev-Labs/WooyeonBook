import styles from '@/styles/category/categoryBookItemWrapper/categoryBookItemWrapper.module.css';

import Pagination from '@/components/common/Pagination';
import SortBar from './SortBar';
import CategoryBookItemBox from './CategoryBookItemBox';

export default function CategoryBookItemWrapper() {
	return (
		<div className={styles.CategoryBookItemWrapper}>
			<SortBar />
			<CategoryBookItemBox />
			<Pagination />
		</div>
	);
}
