'use client';

import BestSeller from '@/components/common/BestSeller';
import BookItemWrapper from '@/components/common/BookItemWrapper';
import CategoryBox from '@/components/common/CategoryBox';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/used/used.module.css';
import { UsedBookType } from '@/types/bookType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

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
	const [itemLength, setItemLength] = useState<number>(0);
	// 선택된 페이지네이션 숫자 ref
	const selectedNumRef = useRef<number>(1);

	// 페이지(숫자) 선택 시 실행되는 함수
	const handleClickPage = (pageNum: number) => {
		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
		if (selectedNumRef.current === pageNum) return;
		// 현재 페이지의 숫자 스타일링을 위함
		selectedNumRef.current = pageNum;
		// 현재 페이지 숫자 변경
		setCurrentPage(pageNum);
		// 페이지 선택시 페이지 상단으로 스크롤 이동
		window.scrollTo({ top: 804, behavior: 'smooth' });
	};

	// server -> api 받아오는 함수(중고책 - 베스트셀러 5개)
	const fetchUsedBestData = async () => {
		const response = await fetch('http://localhost:8080/list/used', {
			cache: 'force-cache',
		});
		// book item(used best)
		const data = await response.json();
		setUsedBestItem(data);
	};

	// server -> api 받아오는 함수(모든 중고책)
	const fetchUsedAllData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/usedAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'force-cache' },
		);
		const { data, dataLength } = await response.json();
		// book item(used all)
		setUsedAllItem(data);
		// book item의 총 개수
		setItemLength(dataLength);
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
				<div />
				<div className={styles.wrapper}>
					<BestSeller page="used" isUsedPage={true} data={usedBestItem} />
					<div className={styles.usedLine} />
					<CategoryBox />
					{/* <Sort /> */}
					<BookItemWrapper data={usedAllItem} />
					<Pagination
						itemLength={itemLength}
						handleClickPage={handleClickPage}
						currentPage={currentPage}
						selectedNumRef={selectedNumRef}
						page="used"
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}
