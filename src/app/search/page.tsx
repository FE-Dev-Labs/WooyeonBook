'use client';

import SortBar from '@/components/category/categoryContents/SortBar';
import BookItemWrapper from '@/components/common/BookItemWrapper';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import { sortTypeState } from '@/recoil/atom/sortTypeAtom';
import styles from '@/styles/search/search.module.css';
import { NewBookType } from '@/types/bookType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';

export default function searchPage() {
	// useParams 호출
	const params = useSearchParams();
	// params에서 가져온 keyword
	const keyword = params.get('keyword');
	// 쿼리에서 가져온 검색어 state
	const [data, setData] = useState<NewBookType[]>([]);
	// 검색어의 개수 state
	const [dataLength, setDataLength] = useState<number>(0);
	// 현재 카테고리의 페이지 state
	const [currentPage, setCurrentPage] = useState<number>(1);
	// 소팅 state(제목순, 최신순)
	const sortType = useRecoilValue(sortTypeState);

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/search?query=${keyword}`,
			// {
			// 	cache: 'force-cache',
			// },
		);
		const { data, dataLength } = await response.json();
		setData(data);
		setDataLength(dataLength);
	};

	// 각 페이지(숫자) 선택 시 실행되는 함수(페이지네이션)
	const handlePageNumClick = (pageNum: number) => {
		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
		if (currentPage === pageNum) return;
		// 현재 페이지 숫자 변경
		setCurrentPage(pageNum);
		// 페이지 선택시 페이지 상단으로 스크롤 이동
		window.scrollTo({ top: 300, behavior: 'smooth' });
	};

	// 소팅한 data
	const sortedData =
		// 제목순일 때의 sort
		sortType === '제목순'
			? data.sort((a, b) => a.title.localeCompare(b.title))
			: // 제목순이 아닐 떄의 sort(최신순). 비교군이 2가지라서 삼항연산자로 만들어 놓음
				data.sort(
					(a, b) =>
						new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
				);

	// 검색어 데이터 이걸 사용해서 데이터 뿌리시오
	useEffect(() => {
		fetchData();
	}, [keyword]);
	console.log(keyword);

	return (
		<>
			<PageHeader title={`'${keyword}' 에 대한 검색 결과`} />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<SortBar page="search" dataLength={dataLength} />
					<BookItemWrapper data={sortedData} currentPage={currentPage} />
					<Pagination
						dataLength={dataLength}
						currentPage={currentPage}
						handlePageNumClick={handlePageNumClick}
					/>
				</div>
			</div>
		</>
	);
}
