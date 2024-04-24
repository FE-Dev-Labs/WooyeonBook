import styles from '@/styles/category/categoryView/cartView.module.css';
import CategoryBar from './categoryBar/CategoryBar';
import CategoryContents from './categoryContents/CategoryContents';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { NewBookType } from '@/types/bookType';

interface categoryViewProps {
	categoryId: string;
	data: NewBookType[];
	dataLength: number;
}

export default function CategoryView({
	categoryId,
	data,
	dataLength,
}: categoryViewProps) {
	return (
		<div className={styles.container}>
			<aside />
			<main className={styles.wrapper}>
				<CategoryBar categoryId={categoryId} />
				<CategoryContents
					data={data}
					categoryId={categoryId}
					dataLength={dataLength}
				/>
			</main>
			<aside>
				<RecentlyViewedBooks />
			</aside>
		</div>
	);
}
