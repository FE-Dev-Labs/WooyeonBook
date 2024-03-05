'use client';

import styles from '@/styles/common/sort.module.css';
import { useState } from 'react';

interface SortProps {
	page?: string;
}

export default function Sort({ page }: SortProps) {
	//
	const [selectSort, setSelectSort] = useState();

	const handleClickSort = () => {};

	return (
		<div className={styles.sortBox}>
			{/* search page일 시 상품 갯수 추가 */}
			{page === 'search' ? (
				<div className={styles.productAmounts}>상품 (123)</div>
			) : (
				<div style={{ visibility: 'hidden' }}></div>
			)}
			<div className={styles.sortItem}>
				<span>인기순</span>
				<span>출간일순</span>
				<span>제목순</span>
				<span>판매순</span>
			</div>
		</div>
	);
}
