'use client';

import CategoryBox from '@/components/common/CategoryBox';
import styles from '@/styles/best/bestView/bestView.module.css';
import Rank from './rank/Rank';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { useEffect, useState } from 'react';
import { BestSellerType } from '@/types/bookType';
import { useRecoilValue } from 'recoil';
import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';
import Pagination from '@/components/common/Pagination';

export default function BestView({ categoryId }: { categoryId: string }) {
	// category page data state
	const [data, setData] = useState<BestSellerType[]>([]);
	// current page value
	const currentPage = useRecoilValue(CurrentPageAtom);

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/bestAll?categoryId=${categoryId}&currentPage=${currentPage}`,
			{ next: { revalidate: 3600 } },
		);
		const { data } = await response.json();
		setData(data);
	};

	// data 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [categoryId, currentPage]);

	return (
		<div className={styles.container}>
			<aside />
			<main className={styles.wrapper}>
				<CategoryBox categoryId={categoryId} />
				<Rank data={data} />
				<Pagination dataLength={240} page="best" />
			</main>
			<aside>
				<RecentlyViewedBooks />
			</aside>
		</div>
	);
}
