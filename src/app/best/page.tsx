import Category from '@/components/best/category/Category';
import PageHeader from '@/components/common/PageHeader';
import Sort from '@/components/common/Sort';
import styles from '@/styles/best/best.module.css';

export default function bestPage() {
	return (
		<>
			<PageHeader title="베스트셀러" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<Category />
					<Sort />
				</div>
			</div>
		</>
	);
}
