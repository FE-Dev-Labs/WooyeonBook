'use client';

import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import { useState } from 'react';
import styles from '@/styles/community/post/BookSearch.module.css';
function BookSearch() {
	// 검색 결과 토글 상태
	const [openSearchResultsState, setOpenSearchResultsState] = useState(false);
	// 검색 결과 토글 이벤트
	const openSearchResults = () => {
		setOpenSearchResultsState(true);
	};

	return (
		<div className={styles.container}>
			<input type="text" onClick={openSearchResults} />
			<button>
				<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
			</button>
			{openSearchResultsState && (
				<div className={styles.searchResultWrap}>
					<div className={styles.searchResultItemWrap}>
						<div className={styles.searchResultItemTitle}>책 제목</div>
						<div className={styles.searchResultItemAuthor}>책 글쓴이</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default BookSearch;
