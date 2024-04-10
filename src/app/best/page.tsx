'use client';

import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/best/best.module.css';
import Pagination from '@/components/common/Pagination';
import Rank from '@/components/best/Rank';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BestSellerType } from '@/types/bookType';
import CategoryBox from '@/components/common/CategoryBox';

export default function bestPage() {
	// useSearchParams 호출
	const params = useSearchParams();
	// url 내 categoryId 추출
	const categoryId = params.get('categoryId');
	// 신간 도서 전체 아이템 state
	const [bestAllItem, setBestAllItem] = useState<BestSellerType[]>([]);
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
	const fetchBestAllData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/bestAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'no-store' },
		);
		const { data, dataLength } = await response.json();
		// book item
		setBestAllItem(data);
		// book item의 총 개수
		setDataLength(dataLength);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchBestAllData();
		// 카테고리 또는 현재 페이지(페이지네이션)이 변경될 때
	}, [categoryId, currentPage]);

	return (
		<div>
			<PageHeader title="인기" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<CategoryBox />
					<Rank data={bestAllItem} />
					<Pagination
						dataLength={dataLength}
						handlePageNumClick={handlePageNumClick}
						currentPage={currentPage}
						page="best"
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</div>
	);
}
