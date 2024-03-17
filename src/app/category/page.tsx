'use client';

import CategoryBar from '@/components/category/categoryBar/CategoryBar';
import CategoryContents from '@/components/category/categoryContents/CategoryContents';
import PageHeader from '@/components/common/PageHeader';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/category/category.module.css';
import { NewBookType } from '@/types/bookType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function categoryPage() {
	// useSearchParams 호출
	const params = useSearchParams();
	// url 내 categoryId 추출
	const categoryId = params.get('categoryId');
	// 신간 도서 전체 아이템 state
	const [newAllItem, setNewAllItem] = useState<NewBookType[]>([]);
	// 현재 카테고리의 페이지 state
	const [currentPage, setCurrentPage] = useState<number>(1);
	// 현재 카테고리 아이템의 총 갯수 state
	const [itemLength, setItemLength] = useState<number>(0);
	// 선택된 페이지네이션 숫자 ref
	const selectedNumRef = useRef<number>(1);

	// 현재 선택된 카테고리 아이템 찾기
	const currentCategoryItem = categoryItem.find(
		(item) => item.id === Number(categoryId),
	);

	// 페이지(숫자) 선택 시 실행되는 함수
	const handlePageNumClick = (pageNum: number) => {
		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
		if (selectedNumRef.current === pageNum) return;
		// 현재 페이지의 숫자 스타일링을 위함
		selectedNumRef.current = pageNum;
		// 현재 페이지 숫자 변경
		setCurrentPage(pageNum);
		// 페이지 선택시 페이지 상단으로 스크롤 이동
		window.scrollTo({ top: 300, behavior: 'smooth' });
	};

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/newAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'force-cache' },
		);
		const { data, dataLength } = await response.json();
		// book item
		setNewAllItem(data);
		// book item의 총 개수
		setItemLength(dataLength);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [categoryId, currentPage]);

	return (
		<>
			<PageHeader
				title={currentCategoryItem ? currentCategoryItem.name : '전체'}
			/>
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<CategoryBar />
					<CategoryContents
						data={newAllItem}
						itemLength={itemLength}
						handlePageNumClick={handlePageNumClick}
						currentPage={currentPage}
						selectedNumRef={selectedNumRef}
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}

// 카테고리 분류
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
