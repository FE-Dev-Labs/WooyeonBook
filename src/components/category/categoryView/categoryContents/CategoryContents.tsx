'use client';

import styles from '@/styles/category/categoryView/categoryContents/categoryContents.module.css';
import Pagination from '@/components/common/Pagination';
import { NewBookType } from '@/types/bookType';
import { useRecoilValue } from 'recoil';
import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';
import { useEffect, useState } from 'react';
import { sortTypeAtom } from '@/recoil/atom/sortTypeAtom';
import CategoryBookItemBox from './categoryBookItemBox/CategoryBookItemBox';
import SortBar from '@/components/common/SortBar';

interface CategoryConentsProp {
	categoryId: string;
	page: string;
}

export default function CategoryContents({ categoryId }: CategoryConentsProp) {
	// category page data state
	const [data, setData] = useState<NewBookType[]>([]);
	// current page value
	const currentPage = useRecoilValue(CurrentPageAtom);
	// sort type value
	const sortType = useRecoilValue(sortTypeAtom);

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/newAll?categoryId=${categoryId}&sortType=${sortType}`,
			{ next: { revalidate: 3600 } },
		);
		const { data } = await response.json();
		setData(data);
	};

	// data 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [categoryId, sortType]);

	// 페이지 첫 시작 데이터의 숫자, 24 = 카테고리 페이지에 나타낼 아이템 갯수
	const startIndex = (currentPage - 1) * 24;
	// 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	const endIndex = startIndex + 24;
	// 해당 페이지에서 보여줄 데이터
	const pageData = data?.slice(startIndex, endIndex);

	return (
		<div className={styles.categoryContents}>
			{/* <CategorySlider /> */}
			<SortBar categoryId={categoryId} page="category" />
			<CategoryBookItemBox data={pageData} />
			<Pagination dataLength={data.length} />
		</div>
	);
}