'use client';

import Image from 'next/image';
import searchIcon from '@/assets/common/searchIcon.png';
import { useEffect, useRef, useState } from 'react';
import styles from '@/styles/community/post/bookSearch.module.css';
import { useSetRecoilState } from 'recoil';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import { useInputState } from '@/hooks/useInputState';
import useOutsideClick from '@/hooks/useOutsideClick';

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
	const ref = useRef<HTMLInputElement>(null);
	const [showSearchHistory, setShowSearchHistory] = useState(false);
	const searchBook = useInputState('');

	// search book data
	const [searchData, setSearchData] = useState<SearchData[]>([]);

	const getdata = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/aladin/book?bookName=${
				searchBook.value as string
			}`,
		);
		const data = await res.json();

		setSearchData(data);
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			const searchbook = searchBook.value as string;
			if (searchbook.length > 1) {
				getdata();
			}
		}, 200);
		return () => clearTimeout(debounce);
	}, [searchBook.value]);

	const setSelectBookData = useSetRecoilState(selectBookData);

	useEffect(() => {
		return () => {
			setSelectBookData({
				bookName: '',
				bookImgUrl: '',
				bookId: '',
			});
		};
	}, []);

	const coverReplace = (cover: string) => {
		if (cover.indexOf('/coversum/') !== -1) {
			return cover.replace('/coversum/', '/cover500/');
		} else {
			return cover.replace('/cover/', '/cover500/');
		}
	};

	const selectBook = (name: string, cover: string, id: string) => {
		setSelectBookData({
			bookName: name,
			bookImgUrl: coverReplace(cover),
			bookId: id,
		});
		setShowSearchHistory(false);
	};

	// useOutsideClick 훅
	useOutsideClick({
		ref,
		handler: () => {
			setShowSearchHistory(false);
		},
	});

	const handleFocus = () => {
		setShowSearchHistory(true);
	};
	const handleBlur = () => {
		setShowSearchHistory(false);
	};

	return (
		<div className={styles.container}>
			<input
				type="text"
				value={searchBook.value as string}
				onChange={searchBook.onChange}
				onFocus={handleFocus}
				onBlur={handleBlur}
			/>
			<button>
				<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
			</button>
			{showSearchHistory && (
				<div className={styles.searchResultWrap}>
					{searchData.map((data) => {
						return (
							<div
								className={styles.searchResultItemWrap}
								onMouseDown={() =>
									selectBook(data.title, data.cover, data.isbn)
								}
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
