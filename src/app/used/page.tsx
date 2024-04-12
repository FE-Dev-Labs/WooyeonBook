'use client';

import BestSeller from '@/components/common/BestSeller';
import CategoryBox from '@/components/common/CategoryBox';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import BookItemWrapper from '@/components/common/bookItem/BookItemWrapper';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/used/used.module.css';
import { UsedBookType } from '@/types/bookType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function usedPage() {
	// useSearchParams 호출
	const params = useSearchParams();
	// url 내 categoryId 추출
	const categoryId = params.get('categoryId');
	// 중고 도서 베스트셀러 아이템 state
	const [usedBestItem, setUsedBestItem] = useState<UsedBookType[]>([]);
	// 전체 중고 도서 아이템 state
	const [usedAllItem, setUsedAllItem] = useState<UsedBookType[]>([]);
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

	// server -> api 받아오는 함수(중고책 - 베스트셀러 5개)
	const fetchUsedBestData = async () => {
		const response = await fetch('http://localhost:8080/list/used', {
			cache: 'no-store',
		});
		// book item(used best)
		const data = await response.json();
		setUsedBestItem(data);
	};

	// server -> api 받아오는 함수(모든 중고책)
	const fetchUsedAllData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/usedAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'no-store' },
		);
		const { data, dataLength } = await response.json();
		// book item(used all)
		setUsedAllItem(data);
		// book item의 총 개수
		setDataLength(dataLength);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchUsedBestData();
		fetchUsedAllData();
	}, [categoryId, currentPage]);

	return (
		<>
			<PageHeader title="중고도서" />
			<div className={styles.container}>
				<aside />
				<main className={styles.wrapper}>
					<BestSeller page="used" isUsedPage={true} data={usedBestItem} />
					<div className={styles.usedLine} />
					<CategoryBox />
					<BookItemWrapper data={usedAllItem} />
					<Pagination
						dataLength={dataLength}
						handlePageNumClick={handlePageNumClick}
						currentPage={currentPage}
						page="used"
					/>
				</main>
				<aside>
					<RecentlyViewedBooks />
				</aside>
			</div>
		</>
	);
}
