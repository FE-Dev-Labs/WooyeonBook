export const useCategory = (
	selectedCategoryRef?: any,
	router?: any,
	pathname?: string,
) => {
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

	// 카테고리 선택 시 실행되는 함수: 각 카테고리 선택시 파라미터 변경
	const handleClickCategory = (categoryId: number) => {
		// selectedCategoryRef.current 값 변경
		selectedCategoryRef.current = categoryId;

		// 카테고리: 전체 시 아이디 null로 찍힘
		if (!categoryId) {
			router.push(pathname);
		} else {
			router.push(`${pathname}?categoryId=${categoryId}`);
		}
	};

	return { categoryItem, handleClickCategory };
};
