'use client';

import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import UsedBook from '@/components/main/usedBook/UsedBook';
import BestSeller from '@/components/common/BestSeller';
import MainSlider from '@/components/main/mainSlider/MainSlider';
import { BestSellerType, NewBookType, UsedBookType } from '@/types/bookType';
import { useEffect, useState } from 'react';
import {
	getBestBookData,
	getNewBookData,
	getUsedBookData,
} from '@/apis/main/main';

export default function Home() {
	// 메인 페이지에 뿌려줄 신간도서 state
	const [newBookItems, setNewBookItems] = useState<NewBookType[]>([]);
	// 메인 페이지에 뿌려줄 베스트셀러 state
	const [bestSellerItems, setBestSellerItems] = useState<BestSellerType[]>([]);
	// 메인 페이지에 뿌려줄 중고도서 state
	const [usedBookItems, setUsedBookItems] = useState<UsedBookType[]>([]);
	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const data = await getNewBookData();
	// 		setNewBookItems(data);
	// 	};

	// 	fetchData();
	// }, []);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const data = await getBestBookData();
	// 		setBestSellerItems(data);
	// 	};

	// 	fetchData();
	// }, []);

	// useEffect(() => {
	// 	const fetchData = async () => {
	// 		const data = await getUsedBookData();
	// 		setUsedBookItems(data);
	// 	};

	// 	fetchData();
	// }, []);

	// 하나의 useEffect에서 비동기 처리할지?
	// Promise.all을 사용할지?
	// 기존 3개의 useEffect를 사용할지? (-> 리액트 쿼리 도입 후 코드 단축?)

	// 메인 페이지에 신간 도서, 베스트셀러, 중고 도서를 뿌려주기 위한 useEffect
	useEffect(() => {
		const fetchData = async () => {
			const newBookData = await getNewBookData();
			setNewBookItems(newBookData);

			const bestSellerData = await getBestBookData();
			setBestSellerItems(bestSellerData);

			const usedBookData = await getUsedBookData();
			setUsedBookItems(usedBookData);
		};

		fetchData();
	}, []);

	return (
		<main className={styles.container}>
			<div />
			<div className={styles.wrapper}>
				<MainSlider />
				<NewBook data={newBookItems} />
				<ThemeRecommendation />
				<BestSeller data={bestSellerItems} />
				<UsedBook data={usedBookItems} />
			</div>
			<div>
				<RecentlyViewedBooks />
			</div>
		</main>
	);
}
