'use client';

import styles from '@/styles/layout/recentlyViewedBooks.module.css';
import Image from 'next/image';
import bookImage1 from '../../../public/main/book1.jpg';
import bookImage2 from '../../../public/main/book2.jpg';
import arrowLeftIcon from '../../../public/common/arrowLeft.png';
import arrowRightIcon from '../../../public/common/arrowRight.png';
import { useEffect, useState } from 'react';

interface Item {
	itemId: number;
	itemCover: string;
}

export default function RecentlyViewedBooks() {
	// 최근 본 상품 목록 state
	const [recentItems, setRecentItems] = useState<Item[]>([]);

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
				<div className={styles.textWrapper}>최근 본 상품</div>
				<div className={styles.booksWrapper}>
					{recentItems.map((item) => (
						<Image
							key={item.itemId}
							src={item.itemCover}
							alt="book"
							width={60}
							height={80}
						/>
					))}
				</div>
				<div className={styles.buttonWrapper}>
					<div>
						<Image src={arrowLeftIcon} alt="arrow" width={20} height={20} />
					</div>
					<p className={styles.buttonNumber}>1/3</p>
					<div>
						<Image src={arrowRightIcon} alt="arrow" width={20} height={20} />
					</div>
				</div>
			</div>
		</div>
	);
}
