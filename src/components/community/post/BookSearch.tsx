'use client';

import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import { useEffect, useState } from 'react';
import styles from '@/styles/community/post/BookSearch.module.css';
import axios from 'axios';

interface SearchData {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	itemId: number;
	priceSales: number;
	priceStandard: number;
	mallType: string;
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	salesPoint: number;
	adult: boolean;
	fixedPrice: boolean;
	customerReviewRank: number;
	seriesInfo: {
		seriesId: number;
		seriesLink: string;
		seriesName: string;
	};
	subInfo: any; // 'any' type is used here as 'subInfo' object structure is not provided in the input
}
function BookSearch() {
	// 검색 결과 토글 상태
	const [openSearchResultsState, setOpenSearchResultsState] = useState(false);
	// 검색 결과 토글 이벤트
	const openSearchResults = () => {
		setOpenSearchResultsState(true);
	};
	// search book state
	const [searchBook, setSearchBook] = useState<string>('');
	// search book state event
	const onChangeSearchBook = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSearchBook(e.target.value);
	};
	const [searchData, setSearchData] = useState<SearchData[]>([]);
	// search book event api
	const getdata = async () => {
		const { data } = await axios.get(
			`http://localhost:8080/search/book?bookName=${searchBook}`,
		);
		setSearchData(data);
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			if (searchBook.length > 1) {
				getdata();
			}
		}, 700);
		return () => clearTimeout(debounce);
	}, [searchBook]);

	return (
		<div className={styles.container}>
			<input
				type="text"
				onClick={openSearchResults}
				onChange={onChangeSearchBook}
			/>
			<button>
				<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
			</button>
			{openSearchResultsState && (
				<div className={styles.searchResultWrap}>
					{searchData.map((data) => {
						return (
							<div
								className={styles.searchResultItemWrap}
								key={data.itemId}
								style={{ borderBottom: '1px solid #cccccc' }}>
								<div className={styles.searchResultItemTitle}>{data.title}</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}

export default BookSearch;