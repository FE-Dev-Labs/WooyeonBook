'use client';

import styles from '@/styles/category/categoryContents/sortBar.module.css';
import { sortTypeState } from '@/recoil/atom/sortTypeAtom';
import { useRecoilState } from 'recoil';
import { useRef } from 'react';

export default function SortBar() {
	// 소팅 state
	const [sortType, setSortType] = useRecoilState(sortTypeState);
	// 선택된 소팅 ref
	const selectedSortItemRef = useRef<string>('인기순');

	// 소팅 아이템 선택시 동작하는 함수
	const handleSortTypeChange = (newSortType: string) => {
		// 현재 선택된 아이템이 일치하면 리턴
		if (selectedSortItemRef.current === newSortType) return;
		// 현재 선택된 아이템의 스타일링을 위함
		selectedSortItemRef.current = newSortType;
		// 현재 선택된 소팅 아이템 변경
		setSortType(newSortType);
	};

	return (
		<div className={styles.sortBox}>
			<div className={styles.textBox}>
				<p
					className={`${sortType === '인기순' ? styles.selectedSortItem : ''}`}
					onClick={() => handleSortTypeChange('인기순')}>
					인기순
				</p>
				<p
					className={`${sortType === '제목순' ? styles.selectedSortItem : ''}`}
					onClick={() => handleSortTypeChange('제목순')}>
					제목순
				</p>
				<p
					className={`${sortType === '최신순' ? styles.selectedSortItem : ''}`}
					onClick={() => handleSortTypeChange('최신순')}>
					최신순
				</p>
			</div>
		</div>
	);
}
