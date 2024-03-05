'use client';

import BookItemWrapper from '@/components/common/BookItemWrapper';
import Category from '@/components/common/Category';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
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
	// 전체 신간 도서 state
	const [newAllItems, setNewAllItems] = useState<NewBookType[]>([]);

	// data 뿌려주는 useEffect
	useEffect(() => {
		const fetchData = async () => {
			const response = await fetch(
				`http://localhost:8080/list/newAll?categoryId=${categoryId}`,
				{ cache: 'no-cache' },
			);
			const data = await response.json();
			setNewAllItems(data);
		};

		fetchData();
	}, [categoryId]);

	return (
		<>
			<PageHeader title="신간도서" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<Category />
					{/* <Sort /> */}
					<BookItemWrapper data={newAllItems} />
					<Pagination />
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
