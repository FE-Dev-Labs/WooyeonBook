'use client';
import styles from '@/styles/layout/header/search.module.css';
import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import RecentSearch from './History/RecentSearch';
import { useRef, useState } from 'react';
import useOutsideClick from '@/hooks/useOutsideClick';

export default function Search() {
	const ref = useRef<HTMLInputElement>(null);
	const inputRef = useRef<HTMLInputElement>(null);
	const [showSearchHistory, setShowSearchHistory] = useState(false);

	useOutsideClick({
		ref,
		handler: (e) => {
			if (e.target !== inputRef.current) {
				setShowSearchHistory(false);
			}
		},
	});

	// const handleSearchClick = (e: React.MouseEvent<HTMLInputElement>) => {
	// 	e.stopPropagation(); // 이벤트 버블링을 멈춤
	// 	setShowSearchHistory(true); // 항상 true로 설정
	// };
	const handleSearchClick = () => {
		setShowSearchHistory(true);
	};
	return (
		<span>
			<form className={styles.searchForm}>
				<input
					type="text"
					placeholder="작가명 또는 책 제목을 입력하세요."
					onClick={handleSearchClick}
				/>
				<button type="submit" className={styles.searchIcon}>
					<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
				</button>
				<RecentSearch ref={ref} show={showSearchHistory} />
			</form>
		</span>
	);
}
