'use client';
import styles from '@/styles/layout/header/search.module.css';
import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import RecentSearch from './History/RecentSearch';
import { useEffect, useRef, useState } from 'react';

export default function Search() {
	const [showSearchHistory, setShowSearchHistory] = useState(false);
	// 검색어 창 닫기
	const searchHistoryRef = useRef<HTMLDivElement>(null);

	const inputHandleClick = () => {
		setShowSearchHistory(true);
	};

	const inputHandleClickOutside = (event: any) => {
		if (
			searchHistoryRef.current &&
			!searchHistoryRef.current.contains(event.target)
		) {
			setShowSearchHistory(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', inputHandleClickOutside);
		return () => {
			document.removeEventListener('click', inputHandleClickOutside);
		};
	}, []);
	return (
		<form className={styles.searchForm}>
			<input
				type="text"
				placeholder="작가명 또는 책 제목을 입력하세요."
				onClick={inputHandleClick}
			/>
			<button type="submit" className={styles.searchIcon}>
				<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
			</button>
			{showSearchHistory && <RecentSearch ref={searchHistoryRef} />}
		</form>
	);
}
