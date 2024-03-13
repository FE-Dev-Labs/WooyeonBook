import { useCategory } from '@/hooks/useCategory';
import styles from '@/styles/layout/header/navCategory.module.css';
import Link from 'next/link';

export default function NavCategory() {
	// 카테고리 아이템 배열 을 useCategory hook에서 가져옴
	const { categoryItem } = useCategory();

	return (
		<div className={styles.navCategoryWrapper}>
			<div className={styles.navCategoryTitle}>
				분야 <p>▼</p>
			</div>
			<div className={styles.showCategoryItemBox}>
				<Link href={'/category'} className={styles.categoryItem}>
					<p>분야 전체</p>
				</Link>
				{categoryItem.map((item, index) => (
					<Link key={index} href={`/category?categoryId=${item.id}`}>
						{item.name}
					</Link>
				))}
			</div>
		</div>
	);
}
