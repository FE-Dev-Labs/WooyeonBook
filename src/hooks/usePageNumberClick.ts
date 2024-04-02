import { useState } from 'react';

export const usePageNumberClick = () => {
	// 현재 카테고리의 페이지 state
	const [currentPage, setCurrentPage] = useState<number>(1);

	// 각 페이지(숫자) 선택 시 실행되는 함수(페이지네이션)
	const handlePageNumClick = (pageNum: number) => {
		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
		if (currentPage === pageNum) return;
		// 현재 페이지 숫자 변경
		setCurrentPage(pageNum);
		// 페이지 선택시 페이지 상단으로 스크롤 이동
		window.scrollTo({ top: 320, behavior: 'smooth' });
	};

	return { handlePageNumClick };
};
