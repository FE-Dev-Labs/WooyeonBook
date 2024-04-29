'use client';

import styles from '@/styles/category/categoryView/categoryBar/categoryBar.module.css';
import { useCategory } from '@/hooks/useCategory';

export default function CategoryBar({ categoryId }: { categoryId: string }) {
	// useCategory hook
	const { categoryItem, handleCategoryItemClick } = useCategory();

	// categoryId의 타입 불일치로 인해 숫자 타입으로 변환(params에서 get하면 string으로 추출됨)
	const categoryIdNumber = Number(categoryId);

	// categoryId(nav item의 category number)를 파라미터로 받아 스타일링을 위해 className을 바꿔주는 함수
	const linkClassName = (categoryId: number) => {
		return categoryId === categoryIdNumber
			? styles.selectedCategory
			: styles.categoryItem;
	};

	return (
		<section className={styles.container}>
			<nav className={styles.wrapper}>
				<header className={styles.categoryBarTitle}>
					<h1>분야</h1>
				</header>
				<ul className={styles.categoryBar}>
					{categoryItem.map((item) => {
						if (item.id === 0) {
							return null;
						}
						return (
							<li
								key={item.id}
								className={linkClassName(item.id)}
								onClick={() => handleCategoryItemClick(item.id)}>
								{item.name}
							</li>
						);
					})}
				</ul>
			</nav>
		</section>
	);
}
