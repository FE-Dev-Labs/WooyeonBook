import styles from '@/styles/category/categoryView/cartView.module.css';
import CategoryBar from './categoryBar/CategoryBar';
import CategoryContents from './categoryContents/CategoryContents';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';

export default function CategoryView({ categoryId }: { categoryId: string }) {
	return (
		<div className={styles.container}>
			<aside />
			<main className={styles.wrapper}>
				{/* client */}
				<CategoryBar categoryId={categoryId} />
				{/* client */}
				<CategoryContents categoryId={categoryId} page="category" />
			</main>
			<aside>
				{/* client */}
				<RecentlyViewedBooks />
			</aside>
		</div>
	);
}
