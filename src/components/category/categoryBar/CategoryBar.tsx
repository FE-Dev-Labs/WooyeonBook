'use client';

import styles from '@/styles/category/categoryBar/categoryBar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useRef } from 'react';
import { useCategory } from '@/hooks/useCategory';

export default function CategoryBar() {
	// useRouter 호출
	const router = useRouter();
	// usePathname 호출
	const pathname = usePathname();
	// 선택된 카테고리 ref
	const selectedCategoryRef = useRef<number>(0);
	//	카테고리 아이템 배열, 카테고리 선택 함수 를 useCategory hook에서 가져옴
	const { categoryItem, handleClickCategory } = useCategory(
		selectedCategoryRef,
		router,
		pathname,
	);

	return (
		<div>
			<div className={styles.categoryBarWrapper}>
				<header className={styles.categoryBarTitle}>
					<h1>분야</h1>
				</header>
				<ol className={styles.categoryBarItems}>
					{categoryItem.map((item) => (
						<li
							key={item.id}
							className={`${selectedCategoryRef.current === item.id && styles.selectedCategory}`}
							onClick={() => handleClickCategory(item.id)}>
							{item.name}
						</li>
					))}
				</ol>
			</div>
		</div>
	);
}
