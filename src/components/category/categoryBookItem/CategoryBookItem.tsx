import styles from '@/styles/category/categoryBookItem/categoryBookItem.module.css';
import SortBar from './SortBar';

export default function CategoryBookItem() {
	return (
		<div className={styles.bookItemWrapper}>
			<SortBar />
		</div>
	);
}
