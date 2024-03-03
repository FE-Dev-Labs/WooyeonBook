'use client';

import PageHeader from '@/components/common/PageHeader';
import Sort from '@/components/common/Sort';
import styles from '@/styles/best/best.module.css';
import Pagination from '@/components/common/Pagination';
import Category from '@/components/common/Category';
import Rank from '@/components/best/Rank';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BestSellerType } from '@/types/bookType';

export default function bestPage() {
	// useSearchParams 호출
	const params = useSearchParams();
	// url 내 categoryId 추출
	const categoryId = params.get('categoryId');
	// 신간 도서 전체 아이템 state
	const [bestAllItems, setBestAllItems] = useState<BestSellerType[]>([]);
	// 현재 카테고리의 페이지 state
	const [currentPage, setCurrentPage] = useState<number>(1);
	// 현재 카테고리 아이템의 총 갯수 state
	const [itemLength, setItemLength] = useState<number>(0);

	// 페이지(숫자) 선택 시 실행되는 함수
	const handleClickPage = (page: number) => {
		setCurrentPage(page);
	};

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/bestAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'no-cache' },
		);
		const { data, dataLength } = await response.json();
		// book item
		setBestAllItems(data);
		// book item의 총 개수
		setItemLength(dataLength);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [categoryId, currentPage]);

	return (
		<>
			<PageHeader title="인기" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<Category />
					<Sort page="best" />
					<Rank data={bestAllItems} />
					<Pagination
						itemLength={itemLength}
						handleClickPage={handleClickPage}
						page="best"
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}
