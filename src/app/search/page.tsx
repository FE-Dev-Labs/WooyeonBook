'use client';
import SortBar from '@/components/category/categoryContents/SortBar';
import CategoryBox from '@/components/common/CategoryBox';
import PageHeader from '@/components/common/PageHeader';
import Sort from '@/components/common/Sort';
import { searchKeyword } from '@/recoil/atom/searchKeyword';
import styles from '@/styles/search/search.module.css';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function searchPage() {
	// useParams 호출
	const params = useSearchParams();
	// params에서 가져온 keyword
	const keyword = params.get('keyword');
	// 쿼리에서 가져온 검색어 state
	const [searchItem, setSearchItem] = useState<string>('');
	// 검색어의 개수 state
	const [searchDataLength, setSearchDataLength] = useState<number>(0);

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/search?Query=${keyword}`,
			// {
			// 	cache: 'force-cache',
			// },
		);
		const { data, dataLength } = await response.json();

		console.log(data);
		console.log(dataLength);

		// 해당 카테고리 all item
		setSearchItem(data);
		// 해당 카테고리 아이템 갯수
		setSearchDataLength(dataLength);
	};

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
					{/* <Sort page="search" /> */}
					<SortBar page="search" searchDataLength={searchDataLength} />
					{/* <BookItemWrapper /> */}
					{/* <Pagination /> */}
				</div>
			</div>
		</>
	);
}
