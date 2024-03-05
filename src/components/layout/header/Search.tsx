'use client';
import styles from '@/styles/layout/header/search.module.css';
import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import RecentSearch from './History/RecentSearch';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function Search() {
	// 외부 클릭 시
	const ref = useRef<HTMLInputElement>(null);
	// 최근 검색어, 인기 검색어
	const [showSearchHistory, setShowSearchHistory] = useState(false);
	// 자동 검색어
	const [keyword, setKeyword] = useState<string>('');
	// 검색창에 이벤트 조작을 이용하여 우리가 검색할 keyword변수
	const onChangData = (e: React.FormEvent<HTMLInputElement>) => {
		setKeyword(e.currentTarget.value);
	};

	// useOutsideClick 훅
	useOutsideClick({
		ref,
		handler: () => {
			setShowSearchHistory(false);
		},
	});

	// input 커서 시 RecentSearch 컴포넌트 나오는 로직
	const handleFocus = () => {
		setShowSearchHistory(true);
	};

	return (
		<span>
			<form className={styles.searchForm}>
				<input
					type="text"
					placeholder="작가명 또는 책 제목을 입력하세요."
					onFocus={handleFocus}
					onChange={onChangData}
					ref={ref}
				/>
				<button type="submit" className={styles.searchIcon}>
					<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
				</button>
				{showSearchHistory && <RecentSearch />}
			</form>
		</span>
	);
}
