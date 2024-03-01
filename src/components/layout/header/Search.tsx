'use client';
import styles from '@/styles/layout/header/search.module.css';
import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import RecentSearch from './History/RecentSearch';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function Search() {
	const ref = useRef<HTMLInputElement>(null);

	const [showSearchHistory, setShowSearchHistory] = useState(false);

	useOutsideClick({
		ref,
		handler: () => {
			setShowSearchHistory(false);
		},
	});

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
