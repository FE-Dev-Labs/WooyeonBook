import styles from '@/styles/category/category.module.css';
import PageHeader from '@/components/common/PageHeader';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';

export default function categoryPage() {
	return (
		<div>
			<PageHeader title="카테고리페이지" />
			<div className={styles.container}>
				<aside />
				<main className={styles.wrapper}>
					{/* <CategoryBar /> */}
					{/* <CategoryContents
						data={data}
						dataLength={dataLength}
						// currentPage={currentPage}
						currentPage={Number(searchParams.num)}
						page="category"
					/> */}
				</main>
				<aside>
					<RecentlyViewedBooks />
				</aside>
			</div>
		</div>
	);
}
