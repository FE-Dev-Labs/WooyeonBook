'use client';

import SortBar from '@/components/category/categoryContents/SortBar';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import SearchBookItemWrapper from '@/components/search/SearchBookItemWrapper';
import { sortTypeAtom } from '@/recoil/atom/sortTypeAtom';
import styles from '@/styles/search/search.module.css';
import { NewBookType } from '@/types/bookType';
// import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function searchPage({
	searchParams,
}: {
	searchParams: { keyword: any };
}) {
	// keyword
	const keyword = searchParams.keyword;

	// useParams 호출
	// const params = useSearchParams();
	// params에서 가져온 keyword
	// const keyword = params.get('keyword');
	// 쿼리에서 가져온 검색어 state
	// const [data, setData] = useState<NewBookType[]>([]);
	// 검색어의 개수 state
	// const [dataLength, setDataLength] = useState<number>(0);
	// 현재 카테고리의 페이지 state
	// const [currentPage, setCurrentPage] = useState<number>(1);
	// 소팅 state(제목순, 최신순)
	// const sortType = useRecoilValue(sortTypeAtom);
	// 로딩 state
	// const [isLoading, setIsLoading] = useState<boolean>(false);

	// 각 페이지(숫자) 선택 시 실행되는 함수(페이지네이션)
	// const handlePageNumClick = (pageNum: number) => {
	// 	// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
	// 	if (currentPage === pageNum) return;
	// 	// 현재 페이지 숫자 변경
	// 	setCurrentPage(pageNum);
	// 	// 페이지 선택시 페이지 상단으로 스크롤 이동
	// 	window.scrollTo({ top: 320, behavior: 'smooth' });
	// };

	// // server -> api 받아오는 함수
	// const fetchSearchData = async () => {
	// 	// 검색 시작 시 로딩 상태 true
	// 	setIsLoading(true);
	// 	try {
	// 		const response = await fetch(
	// 			`http://localhost:8080/list/search?query=${keyword}`,
	// 			{
	// 				cache: 'no-store',
	// 			},
	// 		);
	// 		const { data, dataLength } = await response.json();
	// 		setData(data);
	// 		setDataLength(dataLength);
	// 	} catch (error) {
	// 		console.error('검색 데이터를 가져오는 중 오류가 발생했습니다.', error);
	// 	} finally {
	// 		// 검색 완료 시 로딩 상태 false
	// 		setIsLoading(false);
	// 	}
	// };

	// // 소팅한 data
	// const sortedData =
	// 	// 제목순일 때의 sort
	// 	sortType === '제목순'
	// 		? data?.sort((a, b) => a.title.localeCompare(b.title))
	// 		: // 제목순이 아닐 떄의 sort(최신순). 비교군이 2가지라서 삼항연산자로 만들어 놓음
	// 			data?.sort(
	// 				(a, b) =>
	// 					new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
	// 			);

	// // 페이지 첫 시작 데이터의 숫자, 24 = 카테고리 페이지에 나타낼 아이템 갯수
	// const startIndex = (currentPage - 1) * 30;
	// // 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	// const endIndex = startIndex + 30;
	// // 해당 페이지에서 보여줄 데이터
	// const pageData = sortedData?.slice(startIndex, endIndex);

	// // fetchData 뿌려주는 useEffect
	// useEffect(() => {
	// 	fetchSearchData();
	// }, [keyword]);

	return (
		<div>
			{/* {isLoading ? (
				<main className={styles.loadingContainer}>
					'{keyword}'에 대한 검색 결과를 찾는 중입니다. 😎
				</main>
			) : !pageData?.length ? (
				<main className={styles.loadingContainer}>
					'{keyword}'에 대한 검색 결과를 찾을 수 없습니다. 🤔
				</main>
			) : ( */}
			<>
				<PageHeader title={`'${keyword}' 검색 결과`} />
				<div className={styles.container}>
					<main className={styles.wrapper}>
						{/* <SortBar page="search" dataLength={dataLength} /> */}
						{/* <SearchBookItemWrapper data={pageData} /> */}
						<Pagination
						// dataLength={dataLength}
						// currentPage={currentPage}
						// handlePageNumClick={handlePageNumClick}
						/>
					</main>
				</div>
			</>
			{/* )} */}
		</div>
	);
}
