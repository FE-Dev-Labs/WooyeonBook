'use client';

import styles from '@/styles/search/searchView/seachVIew.module.css';
import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';
import { NewBookType } from '@/types/bookType';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import SearchBookItemWrapper from './searchBookItemWrapper/SearchBookItemWrapper';
import Pagination from '@/components/common/Pagination';
import SortBar from '@/components/common/SortBar';

interface SearchViewProps {
	keyword: string;
	data: NewBookType[];
}

export default function SearchView({ keyword, data }: SearchViewProps) {
	// // 로딩 state
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	// current page value
	const currentPage = useRecoilValue(CurrentPageAtom);
	// 페이지 첫 시작 데이터의 숫자, 30 = 카테고리 페이지에 나타낼 아이템 갯수
	const startIndex = (currentPage - 1) * 30;
	// 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	const endIndex = startIndex + 30;
	// 해당 페이지에서 보여줄 데이터
	const pageData = data?.slice(startIndex, endIndex);

	return (
		<div className={styles.container}>
			{/* {isLoading && (
				<main className={styles.loadingContainer}>
					'{keyword}'에 대한 검색 결과를 찾는 중입니다. 잠시만 기다려주세요.😎
				</main>
			)}
			{!isLoading && data.length > 0 && (
				<main className={styles.wrapper}>
					<SortBar keyword={keyword} page="search" dataLength={data.length} />
					<SearchBookItemWrapper data={pageData} />
					<Pagination dataLength={data.length} />
				</main>
			)}
			{!isLoading && data.length === 0 && (
				<main className={styles.loadingContainer}>
					'{keyword}'에 대한 검색 결과를 찾을 수 없습니다. 🤔
				</main>
			)} */}
			<main className={styles.wrapper}>
				<SortBar keyword={keyword} page="search" dataLength={data.length} />
				<SearchBookItemWrapper data={pageData} />
				<Pagination dataLength={data.length} />
			</main>
		</div>
	);
}
