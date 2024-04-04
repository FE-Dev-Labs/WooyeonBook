'use client';

import BookItemWrapper from '@/components/common/BookItemWrapper';
import CategoryBox from '@/components/common/CategoryBox';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/new/new.module.css';
import { NewBookType } from '@/types/bookType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function newPage() {
	// useSearchParams 호출
	const params = useSearchParams();
	// url 내 categoryId 추출
	const categoryId = params.get('categoryId');
	// 신간 도서 전체 아이템 state
	const [newSpecialAllItem, setNewSpecialAllItem] = useState<NewBookType[]>([]);
	// 현재 카테고리의 페이지 state
	const [currentPage, setCurrentPage] = useState<number>(1);
	// 현재 카테고리 아이템의 총 갯수 state
	const [dataLength, setDataLength] = useState<number>(0);

	// 각 페이지(숫자) 선택 시 실행되는 함수(페이지네이션)
	const handlePageNumClick = (pageNum: number) => {
		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
		if (currentPage === pageNum) return;
		// 현재 페이지 숫자 변경
		setCurrentPage(pageNum);
		// 페이지 선택시 페이지 상단으로 스크롤 이동
		window.scrollTo({ top: 320, behavior: 'smooth' });
	};

	// server -> api 받아오는 함수
	const fetchNewAllData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/newSpecialAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'no-store' },
		);
		const { data, dataLength } = await response.json();

		// book item
		setNewSpecialAllItem(data);
		// book item의 총 개수
		setDataLength(dataLength);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchNewAllData();
	}, [categoryId, currentPage]);

	return (
		<>
			<PageHeader title="신간도서" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<CategoryBox />
					<BookItemWrapper data={newSpecialAllItem} />
					<Pagination
						dataLength={dataLength}
						handlePageNumClick={handlePageNumClick}
						currentPage={currentPage}
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}
