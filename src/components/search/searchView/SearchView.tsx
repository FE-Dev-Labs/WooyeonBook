'use client';

import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';
import { sortTypeAtom } from '@/recoil/atom/sortTypeAtom';
import styles from '@/styles/search/searchView/seachVIew.module.css';
import { NewBookType } from '@/types/bookType';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SearchBookItemWrapper from './searchBookItemWrapper/SearchBookItemWrapper';
import Pagination from '@/components/common/Pagination';
import SortBar from '@/components/common/SortBar';

export default function SearchView({ keyword }: { keyword: any }) {
	// category page data state
	const [data, setData] = useState<NewBookType[]>([]);
	// current page value
	const currentPage = useRecoilValue(CurrentPageAtom);
	// sort type value
	const sortType = useRecoilValue(sortTypeAtom);
	// 로딩 state
	const [isLoading, setIsLoading] = useState<boolean>(false);

	// server -> api 받아오는 함수
	const fetchData = async () => {
		// 검색 시작 시 로딩 상태 true
		setIsLoading(true);
		try {
			const response = await fetch(
				`http://localhost:8080/list/search?query=${keyword}&sortType=${sortType}`,
				{ next: { revalidate: 3600 } },
			);
			const { data } = await response.json();
			setData(data);
		} catch (error) {
			console.error('검색 데이터를 가져오는 중 오류가 발생했습니다.', error);
		} finally {
			// 검색 완료 시 로딩 상태 false
			setIsLoading(false);
		}
	};

	// data 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [keyword, sortType]);

	// 페이지 첫 시작 데이터의 숫자, 30 = 카테고리 페이지에 나타낼 아이템 갯수
	const startIndex = (currentPage - 1) * 30;
	// 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	const endIndex = startIndex + 30;
	// 해당 페이지에서 보여줄 데이터
	const pageData = data?.slice(startIndex, endIndex);

	return (
		<div className={styles.container}>
			{isLoading && (
				<main className={styles.loadingContainer}>
					'{keyword}'에 대한 검색 결과를 찾는 중입니다. 잠시만 기다려주세요.😎
				</main>
			)}
			{!isLoading && data.length > 0 && (
				<main className={styles.wrapper}>
					<SortBar keyword={keyword} page="search" dataLength={data?.length} />
					<SearchBookItemWrapper data={pageData} />
					<Pagination dataLength={data.length} />
				</main>
			)}
			{!isLoading && data.length === 0 && (
				<main className={styles.loadingContainer}>
					'{keyword}'에 대한 검색 결과를 찾을 수 없습니다. 🤔
				</main>
			)}
		</div>
	);
}
