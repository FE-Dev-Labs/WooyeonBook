import CategoryBox from '@/components/category/CategoryBox';
import Category from '@/components/common/Category';
import PageHeader from '@/components/common/PageHeader';
import Sort from '@/components/common/Sort';
import styles from '@/styles/category/category.module.css';

export default function categoryPage() {
	return (
		<>
			<PageHeader title="전체" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<CategoryBox />
					<div className={styles.bookItemWrapper}>
						<div className={styles.sortBox}>
							<div className={styles.textBox}>
								<p>인기순</p>
								<p>최신순</p>
								<p>제목순</p>
								<p>출간일순</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
