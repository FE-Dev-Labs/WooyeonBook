// 'use client';

import { getNewBookData } from '@/apis/aladin';
import BookItemWrapper from '@/components/common/BookItemWrapper';
import Category from '@/components/common/Category';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/new/new.module.css';
import { NewBookType, RootBookType } from '@/types/bookType';
import { useEffect, useState } from 'react';

export default async function newPage() {
	// NewBookData
	// const [data, setData] = useState([]);
	// 카테고리 선택 상태
	// const [selectCategory, setSelectCategory] = useState<string>('전체');

	// 신간도서 페이지에 뿌려줄 신간 리스트
	const newBookData: RootBookType = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});
	// 신간리스트의 item만 추출해 newItem에 할당 (* 만화 카테고리 제외)
	// const newItem: NewBookType[] = newBookData?.item?.flatMap((book) =>
	// 	book.categoryName.split('>')[1] !== '만화' ? [book] : [],
	// );
	const newItem: NewBookType[] = newBookData?.item?.filter(
		(book) => book.categoryName?.split('>')[1] !== '만화',
	) as NewBookType[];
	console.log(newItem);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const data = await getNewBookData();
	// 		setData(data);
	// 	};
	// 	fetchData();
	// 	console.log(data);
	// }, []);

	return (
		<>
			<PageHeader title="신간도서" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					{/* <Category setSelectCategory={setSelectCategory} /> */}
					<Sort />
					<BookItemWrapper data={newItem} />
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
