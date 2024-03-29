'use client';

import styles from '@/styles/category/categoryContents/sortBar.module.css';
import { sortTypeState } from '@/recoil/atom/sortTypeAtom';
import { useRecoilState } from 'recoil';

interface SortBarProp {
	page?: string;
	dataLength?: number | null;
}

export default function SortBar({ page, dataLength }: SortBarProp) {
	// 소팅 state
	const [sortType, setSortType] = useRecoilState(sortTypeState);

	// 소팅 아이템 선택시 동작하는 함수
	const handleSortTypeChange = (sortType: string) => {
		// 소팅 아이템 변경
		setSortType(sortType);
	};

	return (
		<div className={styles.sortBox}>
			{page === 'search' ? (
				<div className={styles.amountBox}>상품 ({dataLength})</div>
			) : (
				<div style={{ visibility: 'hidden' }} />
			)}
			<div className={styles.textBox}>
				{/* <p
					className={`${sortType === '인기순' ? styles.selectedSortItem : ''}`}
					onClick={() => handleSortTypeChange('인기순')}>
					인기순
				</p> */}
				<p
					className={`${sortType === '제목순' && styles.selectedSortItem}`}
					onClick={() => handleSortTypeChange('제목순')}>
					제목순
				</p>
				<p
					className={`${sortType === '최신순' && styles.selectedSortItem}`}
					onClick={() => handleSortTypeChange('최신순')}>
					최신순
				</p>
			</div>
		</div>
	);
}
