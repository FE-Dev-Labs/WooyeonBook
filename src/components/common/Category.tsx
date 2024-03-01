'use client';

import styles from '@/styles/common/category.module.css';
import { useState } from 'react';

// interface Props {
// 	setSelectCategory: (item: string) => void;
// }
export default function Category() {
	const categoryItems = [
		'전체',
		'건강/취미',
		'경제경영',
		'공무원 수험서',
		'과학',
		// '달력/기타',
		'대학교재',
		'만화',
		'사회과학',
		'소설/시/희곡',
		'수험서/자격증',
		'어린이',
		'에세이',
		'여행',
		'역사',
		'예술/대중문화',
		'외국어',
		'요리/살림',
		'유아',
		'인문학',
		'자기계발',
		'잡지',
		'장르소설',
		'전집/중고전집',
		'종교/역학',
		'좋은부모',
		'청소년',
		'컴퓨터/모바일',
		'초등학교참고서',
		'중학교참고서',
		'고등학교참고서',
	];

	return (
		<>
			<div className={styles.categoryBox}>
				{categoryItems.map((item, index) => (
					<div key={index} className={styles.categoryItem}>
						{item}
					</div>
				))}
			</div>
			<div className={styles.categoryBottom}></div>
		</>
	);
}
