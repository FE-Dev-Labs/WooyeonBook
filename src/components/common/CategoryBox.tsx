'use client';

import { useCategory } from '@/hooks/useCategory';
import styles from '@/styles/common/categoryBox.module.css';

export default function CategoryBox({ categoryId }: { categoryId: string }) {
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
		<section>
			<ul className={styles.categoryBox}>
				{categoryItem.map((item) => (
					<li
						className={linkClassName(item.id)}
						key={item.id}
						onClick={() => handleCategoryItemClick(item.id)}>
						{item.name}
					</li>
				))}
			</ul>
			<div className={styles.categoryBottom} />
		</section>
	);
}
