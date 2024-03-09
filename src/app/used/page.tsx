'use client';

import BestSeller from '@/components/common/BestSeller';
import BookItemWrapper from '@/components/common/BookItemWrapper';
import Category from '@/components/common/Category';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/used/used.module.css';
import { UsedBookType } from '@/types/bookType';
import { useEffect, useState } from 'react';

export default function usedPage() {
	// 중고 도서 전체 아이템 state
	const [usedBestItems, setUsedBestItems] = useState<UsedBookType[]>([]);

	const fetchData = async () => {
		const response = await fetch('http://localhost:8080/list/used', {
			cache: 'no-cache',
		});
		const data = await response.json();
		setUsedBestItems(data);
	};

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, []);

	return (
		<>
			<PageHeader title="중고도서" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<BestSeller
						page="used"
						height="500px"
						isUsedPage={true}
						data={usedBestItems}
					/>
					<div className={styles.usedLine} />
					{/* <Category /> */}
					{/* <Sort /> */}
					{/* <BookItemWrapper /> */}
					{/* <Pagination /> */}
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}
