'use client';

import styles from '@/styles/layout/header/bottomWrapper/search/search.module.css';
import Image from 'next/image';
import searchIcon from '@/assets/common/searchIcon.png';
import { useEffect, useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';
import { Book } from '@/types/bookDetailDate';
import closeBigIcon from '@/assets/layout/closeBigIcon.png';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { searchKeyword } from '@/recoil/atom/searchKeyword';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import SearchResult from './SearchResult';
import RecentSearch from './recentSearch/RecentSearch';
import { currentPageAtom } from '@/recoil/atom/currentPageAtom';

export default function Search() {
	// 검색어 로컬스토리지 저장
	const { addKeyword } = useLocalStorage('searchKeywords', []);
	const router = useRouter();
	// 외부 클릭 시
	const ref = useRef<HTMLInputElement>(null);
	// 최근 검색어, 인기 검색어
	const [showSearchHistory, setShowSearchHistory] = useState(false);
	// 검색어 리코일
	const [keyword, setKeyword] = useRecoilState(searchKeyword);
	// 검색어 책 데이터 배열에 넣기
	const [searchData, setSearchData] = useState<Book[]>([]);

	// current page setValue
	const setCurrentPage = useSetRecoilState(currentPageAtom);

	// useModal 훅
	const {
		isOpen,
		handleModalOpenChange,
		handleModalCloseChange,
		handleModalStateChange,
	} = useModal(false);

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
		const word = keyword as string;
		if (word.length > 0) {
			handleModalOpenChange();
			// setOpenSearchResult(true);
		} else {
			setShowSearchHistory(true);
		}
	};

	// 검색어 데이터
	const getdata = async () => {
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/aladin/keyword?keyword=${keyword}`,
			{ next: { revalidate: 86400 } },
		);
		const data = await response.json();
		setSearchData(data);
	};

	// keyword가 변할 때마다 debouce 이벤트로 setTimeout을 사용하여 0.4초후에 데이터를 호출
	useEffect(() => {
		const debounce = setTimeout(() => {
			const word = keyword as string;
			if (word.length > 0) {
				getdata();
			}
		}, 400);
		return () => clearTimeout(debounce);
	}, [keyword]);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setKeyword(e.target.value);
		// keyword.onChange(e);
		// 만약 input이 빈값이라면 연관검색어 끄고 최근 검색어, 인기 검색어 띄우기
		if (e.target.value === '') {
			setShowSearchHistory(true);
			handleModalCloseChange();
		} else {
			// input에 텍스트 입력 시 최근 검색어, 인기 검색어 닫고 자동 검색어 띄어주기
			setShowSearchHistory(false);
			handleModalOpenChange();
		}
	};

	// input에서 포커스가 사라질 때 검색 결과 숨김
	const handleBlur = () => {
		handleModalCloseChange();
	};

	const keyonSubmit = async () => {
		// 인기 검색어 데이터
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/supabase/popularSearch?keyword=${keyword}`,
		);
		const key = await res.json();

		const postdata = {
			keyword: keyword,
			search_count: 1,
			created_at: new Date(),
		};

		// 검색어에 대한 기록이 서버에 이미 존재하는지를 확인
		if (key.length > 0) {
			await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/update/supabase/keyword?keyword=${keyword}&count=${key[0].search_count}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ search_count: key[0].search_count + 1 }),
				},
			);
		} else {
			// 검색어에 대한 기록이 서버에 없으면 검색어 추가
			await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/create/supabase/keywords`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(postdata),
				},
			);
		}
	};

	// 쿼리값 전달
	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const searchUrl = `/search?keyword=${String(keyword)}&pageNum=1`;
		// 로컬스토리지에 검색어 추가
		// handleSubmitKeyword(String(keyword));
		addKeyword(String(keyword));
		keyonSubmit();
		// 검색어 모달 닫기
		handleModalCloseChange();
		router.push(searchUrl);
		// 1페이지로&제목순으로 초기화
		setCurrentPage(1);
		// setSortType('title'); sort 제거
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
				{isOpen && (
					<div>
						<div className={styles.recentSearchWrapper}>
							<div className={styles.searchResultWord}>
								{searchData?.map((data) => {
									return (
										<SearchResult
											data={data}
											key={data.itemId}
											keyonSubmit={keyonSubmit}
											handleModalStateChange={handleModalStateChange}
										/>
									);
								})}
								<div
									className={styles.lastlestDeleteAll}
									onClick={() => handleModalCloseChange()}>
									<div className={styles.lastlestCloseWrap}>
										<span className={styles.lastelestCloseText}>닫기</span>
										<Image
											src={closeBigIcon}
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
