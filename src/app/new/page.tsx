'use client';

import BookItemWrapper from '@/components/common/BookItemWrapper';
import Category from '@/components/common/Category';
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
	const [newAllItems, setNewAllItems] = useState<NewBookType[]>([]);
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
			`http://localhost:8080/list/newAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'no-cache' },
		);
		const { data, dataLength } = await response.json();
		// book item
		setNewAllItems(data);
		// book item의 총 개수
		setItemLength(dataLength);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [categoryId, currentPage]);

	return (
		<>
			<PageHeader title="신간도서" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<Category />
					<BookItemWrapper data={newAllItems} />
					<Pagination
						itemLength={itemLength}
						handleClickPage={handleClickPage}
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}

// 서버컴포넌트시
// // 메인 페이지 신간 도서
// const response = await fetch('http://localhost:8080//api/newAll/:category?', {
// 	cache: 'no-cache',
// });
// const newAllItems: NewBookType[] = await response.json();

// 클라컴포넌트시(카테고리X)
// new 페이지에 뿌려줄 신간 도서 전체 state

// // 클라 컴포넌트시
// // new 페이지에 신간 도서를 뿌려주기 위한 useEffect
// useEffect(() => {
// 	const fetchData = async () => {
// 		const data = await getAllNewBookData();
// 		setNewAllItems(data);
// 	};

// 	fetchData();
// }, []);
