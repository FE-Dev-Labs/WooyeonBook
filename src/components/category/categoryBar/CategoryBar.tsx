'use client';

import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';
import { sortTypeAtom } from '@/recoil/atom/sortTypeAtom';
import styles from '@/styles/category/categoryBar/categoryBar.module.css';
import { usePathname, useRouter } from 'next/navigation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

export default function CategoryBar({ categoryId }: { categoryId: string }) {
	// useRouter 호출
	const router = useRouter();
	// usePathname 호출
	const pathname = usePathname();
	// sort type value
	const sortType = useRecoilValue(sortTypeAtom);
	// current page setValue
	const setCurrentPage = useSetRecoilState(CurrentPageAtom);
	// categoryId의 타입 불일치로 인해 숫자 타입으로 변환(params에서 get하면 string으로 추출됨)
	const categoryIdNumber = Number(categoryId);

	// 카테고리 선택 시 동작하는 함수
	const handleCategoryItemClick = (categoryId: number) => {
		if (categoryId) {
			router.push(`${pathname}?categoryId=${categoryId}&sortType=${sortType}`);
		}
		// !categoryId 시 기존 페이지로 이동(카테고리-전체 시 아이디 null로 찍힘)
		if (!categoryId) {
			router.push(pathname);
		}
		// 1페이지로 초기화
		setCurrentPage(1);
	};

	// categoryId(nav item의 category number)를 파라미터로 받아 스타일링을 위해className을 바꿔주는 함수
	const linkClassName = (categoryId: number) => {
		return categoryId === categoryIdNumber
			? styles.selectedCategory
			: styles.categoryItem;
	};

	return (
		<section className={styles.container}>
			<nav className={styles.Wrapper}>
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

// 카테고리 아이템
const categoryItem = [
	{ name: '전체', id: 0 },
	{ name: '건강/취미', id: 55890 },
	{ name: '경제경영', id: 170 },
	{ name: '공무원 수험서', id: 34582 },
	{ name: '과학', id: 987 },
	// { name: '달력/기타', id: 4395 },
	{ name: '대학교재', id: 8257 },
	{ name: '만화', id: 2551 },
	{ name: '사회과학', id: 798 },
	{ name: '소설/시/희곡', id: 1 },
	{ name: '수험서/자격증', id: 1383 },
	{ name: '어린이', id: 1108 },
	{ name: '에세이', id: 55889 },
	{ name: '여행', id: 1196 },
	{ name: '역사', id: 74 },
	{ name: '예술/대중문화', id: 517 },
	{ name: '외국어', id: 1322 },
	{ name: '요리/살림', id: 1230 },
	{ name: '유아', id: 13789 },
	{ name: '인문학', id: 656 },
	{ name: '자기계발', id: 336 },
	{ name: '잡지', id: 2913 },
	{ name: '장르소설', id: 112011 },
	{ name: '전집/중고전집', id: 17195 },
	{ name: '종교/역학', id: 1237 },
	{ name: '좋은부모', id: 2030 },
	{ name: '청소년', id: 1137 },
	{ name: '컴퓨터/모바일', id: 351 },
	{ name: '초등학교참고서', id: 50246 },
	{ name: '중학교참고서', id: 76000 },
	{ name: '고등학교참고서', id: 76001 },
];

// useSerachParams 호출
// const params = useSearchParams();
// categoryId 추출
// const categoryId = params.get('categoryId');
