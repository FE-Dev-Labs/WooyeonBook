'use client';

import styles from '@/styles/layout/recentlyViewedBooks.module.css';
import Image from 'next/image';
import arrowLeftIcon from '../../../public/common/arrowLeft.png';
import arrowRightIcon from '../../../public/common/arrowRight.png';
import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Item {
	itemIsbn: string;
	itemCover: string;
	itemMallType: string;
}

export default function RecentlyViewedBooks() {
	// 최근 본 상품 목록 state
	const [recentItems, setRecentItems] = useState<Item[]>([]);
	// 현재 카테고리의 현재 페이지 state
	const [currentPage, setCurrentPage] = useState(0);

	// 페이지 별로 아이템을 보여주기 위해 설정
	const itemsPerPage = 3;
	const totalPages = Math.ceil(recentItems.length / itemsPerPage);

	// 현재 페이지에 따른 아이템을 계산하는 함수
	const currentItems = recentItems.slice(
		currentPage * itemsPerPage,
		(currentPage + 1) * itemsPerPage,
	);

	// 페이지 변경 함수
	const handleNextBtnClick = () => {
		// 현재 페이지가 마지막 페이지보다 작을 때만 페이지 증가
		if (currentPage < totalPages - 1) {
			setCurrentPage((prev) => prev + 1);
		}
	};
	const handlePrebBtnClick = () => {
		// 현재 페이지가 첫 페이지보다 클 때만 페이지 감소
		if (currentPage > 0) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	// 로컬 스토리지에서 가져온 최근 본 상품을 렌더링해줄 useEffect
	useEffect(() => {
		// 로컬 스토리지에서 'recentItems' 가져오기
		const storedItems = localStorage.getItem('recentItems');
		if (storedItems) {
			// 로컬 스토리지에 저장된 아이템이 있다면, JSON 형태로 파싱하여 상태에 설정
			setRecentItems(JSON.parse(storedItems));
		}
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<header className={styles.textWrapper}>최근 본 상품</header>
				<div className={styles.booksWrapper}>
					{currentItems.map((item) => (
						<Link
							href={`/detail/${item?.itemIsbn}?type=${
								item?.itemMallType === 'USED' ? 'used' : 'new'
							}`}>
							<Image
								key={item.itemIsbn}
								src={item.itemCover}
								alt="recently viewed book"
								width={60}
								height={79}
							/>
						</Link>
					))}
				</div>
				<div className={styles.buttonWrapper}>
					<div>
						<Image
							src={arrowLeftIcon}
							alt="arrow"
							width={20}
							height={20}
							onClick={handlePrebBtnClick}
						/>
					</div>
					<p className={styles.buttonNumber}>
						{currentPage + 1}/{totalPages}
					</p>
					<div>
						<Image
							src={arrowRightIcon}
							alt="arrow"
							width={20}
							height={20}
							onClick={handleNextBtnClick}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
