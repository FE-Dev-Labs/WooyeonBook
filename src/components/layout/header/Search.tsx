'use client';
import styles from '@/styles/layout/header/search.module.css';
import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import RecentSearch from './History/RecentSearch';
import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import axios from 'axios';
import { useInputState } from '@/hooks/useInputState';
import SearchResult from './History/SearchResult';
import { Book } from '@/types/bookDetailDate';
import cancelIcon from '../../../../public/layout/cancel.png';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';

export default function Search() {
	// 외부 클릭 시
	const ref = useRef<HTMLInputElement>(null);
	// 최근 검색어, 인기 검색어
	const [showSearchHistory, setShowSearchHistory] = useState(false);
	// 자동 검색어
	const keyword = useInputState('');
	// 검색어 책 데이터 배열에 넣기
	const [searchData, setSearchData] = useState<Book[]>([]);

	// 자동 연관 검색어
	const [openSearchResult, setOpenSearchResult] = useState(false);

	const router = useRouter();

	// useOutsideClick 훅
	useOutsideClick({
		ref,
		handler: () => {
			setShowSearchHistory(false);
		},
	});

	// input 커서 시 RecentSearch 컴포넌트 나오는 로직
	const handleFocus = () => {
		// input에 글자가 있을 경우 최근 검색어, 인기 검색어 띄우지 않는 로직
		const word = keyword.value as string;
		if (word.length > 0) {
			setOpenSearchResult(true);
		} else {
			setShowSearchHistory(true);
		}
	};

	const getdata = async () => {
		try {
			const { data } = await axios.get(
				`http://localhost:8080/search/keyword?keyword=${keyword.value}`,
			);
			setSearchData(data);
		} catch (err) {
			console.error(err);
		}
	};

	useEffect(() => {
		const debounce = setTimeout(() => {
			const word = keyword.value as string;
			if (word.length > 0) {
				getdata();
			}
		}, 400);
		return () => clearTimeout(debounce);
	}, [keyword.value]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		keyword.onChange(e);
		// 만약 input이 빈값이라면 연관검색어 끄고 최근 검색어, 인기 검색어 띄우기
		if (e.target.value === '') {
			setShowSearchHistory(true);
			setOpenSearchResult(false);
		} else {
			// input에 텍스트 입력 시 최근 검색어, 인기 검색어 닫고 자동 검색어 띄어주기
			setShowSearchHistory(false);
			setOpenSearchResult(true);
		}
	};

	// input에서 포커스가 사라질 때 검색 결과 숨김
	const handleBlur = () => {
		setOpenSearchResult(false);
	};

	// 쿼리값 전달
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const searchUrl = `/search?keyword=${String(keyword.value)}`;
		router.push(searchUrl);
	};

	return (
		<span>
			<form className={styles.searchForm} onSubmit={handleSubmit}>
				<input
					type="text"
					placeholder="작가명 또는 책 제목을 입력하세요."
					onFocus={handleFocus}
					onChange={handleInputChange}
					onBlur={handleBlur}
					ref={ref}
				/>
				<button type="submit" className={styles.searchIcon}>
					<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
				</button>
				{showSearchHistory && <RecentSearch />}
				{openSearchResult && (
					<div>
						<div className={styles.recentSearchWrapper}>
							<div className={styles.searchResultWord}>
								{searchData.map((data) => {
									return (
										<SearchResult
											data={data}
											key={data.itemId}
											keyword={keyword.value}
										/>
									);
								})}
								<div
									className={styles.lastlestDeleteAll}
									onClick={() => setOpenSearchResult(false)}>
									<div className={styles.lastlestCloseWrap}>
										<span className={styles.lastelestCloseText}>닫기</span>
										<Image
											src={cancelIcon}
											alt="cancelIcon"
											width={10}
											height={10}
											className={styles.cancelIcon}
										/>
									</div>
								</div>
							</div>
						</div>
					</div>
				)}
			</form>
		</span>
	);
}
