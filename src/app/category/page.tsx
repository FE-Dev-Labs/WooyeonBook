import CategoryBox from '@/components/category/CategoryBox';
import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/category/category.module.css';

export default function categoryPage() {
	return (
		<>
			<PageHeader title="전체" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<CategoryBox />
					<div className={styles.bookItemWrapper}>오른쪽디브</div>
				</div>
			</div>
		</>
	);
}
