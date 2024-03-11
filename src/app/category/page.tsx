'use client';

import CategoryBar from '@/components/category/categoryBar/CategoryBar';
import CategoryContents from '@/components/category/categoryContents/CategoryContents';
import PageHeader from '@/components/common/PageHeader';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/category/category.module.css';
import { NewBookType } from '@/types/bookType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

export default function categoryPage() {
	// useSearchParams 호출
	const params = useSearchParams();
	// url 내 categoryId 추출
	const categoryId = params.get('categoryId');
	// 신간 도서 전체 아이템 state
	const [newAllItem, setNewAllItem] = useState<NewBookType[]>([]);
	// 현재 카테고리의 페이지 state
	const [currentPage, setCurrentPage] = useState<number>(1);
	// 현재 카테고리 아이템의 총 갯수 state
	const [itemLength, setItemLength] = useState<number>(0);
	// 선택된 페이지네이션 숫자 ref
	const selectedNumRef = useRef<number>(1);

	// 페이지(숫자) 선택 시 실행되는 함수
	const handleClickPage = (pageNum: number) => {
		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
		if (selectedNumRef.current === pageNum) return;
		// 현재 페이지의 숫자 스타일링을 위함
		selectedNumRef.current = pageNum;
		// 현재 페이지 숫자 변경
		setCurrentPage(pageNum);
		// 페이지 선택시 페이지 상단으로 스크롤 이동
		window.scrollTo({ top: 300, behavior: 'smooth' });
	};

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/newAll?categoryId=${categoryId}&page=${currentPage}`,
			{ cache: 'force-cache' },
		);
		const { data, dataLength } = await response.json();
		// book item
		setNewAllItem(data);
		// book item의 총 개수
		setItemLength(dataLength);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [categoryId, currentPage]);

	return (
		<>
			<PageHeader title="전체" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<CategoryBar />
					<CategoryContents
						data={newAllItem}
						itemLength={itemLength}
						handleClickPage={handleClickPage}
						currentPage={currentPage}
						selectedNumRef={selectedNumRef}
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}
