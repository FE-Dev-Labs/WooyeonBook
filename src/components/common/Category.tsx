'use client';

import styles from '@/styles/common/category.module.css';
import { useState } from 'react';

export default function Category() {
	// 카테고리 선택 상태
	const [selectCategory, setSelectCategory] = useState<string>('전체');
	// 카테고리 종류
	// const categoryItems = [
	// 	'전체',
	// 	'소설',
	// 	'에세이·시',
	// 	'경제·경영',
	// 	'자기개발',
	// 	'인문',
	// 	'사회·정치',
	// 	'역사',
	// 	'종교',
	// 	'예술·대중문화',
	// 	'자연과학',
	// 	'가정·살림',
	// 	'건강·취미·여행',
	// 	'어린이·유아',
	// 	'청소년',
	// 	'국어·외국어',
	// 	'IT·모바일',
	// 	'대학교재',
	// 	'수험서·자격증',
	// 	'잡지',
	// 	'만화',
	// 	'로맨스',
	// 	'판타지/무협',
	// ];
	const categoryItems = [
		'전체',
		'건강/취미',
		'경제경영',
		'공무원 수험서',
		'과학',
		'달력/기타',
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
				{categoryItems.map((item) => (
					<div
						className={styles.categoryItem}
						onClick={() => setSelectCategory(item)}>
						{item}
					</div>
				))}
			</div>
			<div className={styles.categoryBottom}></div>
		</>
	);
}
