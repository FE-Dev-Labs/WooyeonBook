'use client';

import { getNewBookData } from '@/apis/main/main';
import { getAllNewBookData } from '@/apis/new/new';
import BookItemWrapper from '@/components/common/BookItemWrapper';
import Category from '@/components/common/Category';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/new/new.module.css';
import { NewBookType, RootBookType } from '@/types/bookType';
import { useEffect, useState } from 'react';

export default function newPage() {
	// new 페이지에 뿌려줄 신간 도서 전체 state
	const [newAllItems, setNewAllItems] = useState<NewBookType[]>([]);

	// new 페이지에 신간 도서를 뿌려주기 위한 useEffect
	useEffect(() => {
		const fetchData = async () => {
			const data = await getAllNewBookData();
			setNewAllItems(data);
		};

		fetchData();
	}, []);

	// 카테고리 선택 상태
	// const [selectCategory, setSelectCategory] = useState<string>('전체');

	return (
		<>
			<PageHeader title="신간도서" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					{/* <Category setSelectCategory={setSelectCategory} /> */}
					<Sort />
					<BookItemWrapper data={newAllItems} />
					{/* <BookItemWrapper data={data} /> */}
					<Pagination />
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}
