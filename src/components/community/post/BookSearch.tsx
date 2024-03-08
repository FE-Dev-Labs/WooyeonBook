'use client';

import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import { useEffect, useState } from 'react';
import styles from '@/styles/community/post/BookSearch.module.css';
import axios from 'axios';
import { useSetRecoilState } from 'recoil';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import { useInputState } from '@/hooks/useInputState';
import { useSearchParams } from 'next/navigation';

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
	const pageParams = useSearchParams();
	const page = pageParams.get('page');
	// 검색 결과 토글 상태
	const [openSearchResultsState, setOpenSearchResultsState] = useState(false);
	// 검색 결과 토글 이벤트
	const openSearchResults = () => {
		setOpenSearchResultsState(true);
	};
	const closeSearchResults = () => {
		setOpenSearchResultsState(false);
	};
	const searchBook = useInputState('');

	// search book data
	const [searchData, setSearchData] = useState<SearchData[]>([]);

	const getdata = async () => {
		const { data } = await axios.get(
			`http://localhost:8080/search/book?bookName=${
				searchBook.value as string
			}`,
		);
		setSearchData(data);
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			const searchbook = searchBook.value as string;
			if (searchbook.length > 1) {
				getdata();
			}
		}, 400);
		return () => clearTimeout(debounce);
	}, [searchBook.value]);

	const setSelectBookData = useSetRecoilState(selectBookData);

	const selectBook = (name: string, cover: string, id: string) => {
		setSelectBookData({
			bookName: name,
			bookImgUrl: cover,
			bookId: id,
		});
		closeSearchResults();
	};

	useEffect(() => {
		searchBook.init('');
		setSearchData([]);
	}, [page]);
	return (
		<div className={styles.container}>
			<input
				type="text"
				onClick={openSearchResults}
				value={searchBook.value as string}
				onChange={searchBook.onChange}
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
								onClick={() => selectBook(data.title, data.cover, data.isbn)}
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
