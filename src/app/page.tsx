import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import UsedBook from '@/components/main/usedBook/UsedBook';
import BestSeller from '@/components/common/BestSeller';
import MainSlider from '@/components/main/mainSlider/MainSlider';
import { BestSellerType, NewBookType, UsedBookType } from '@/types/bookType';

export default async function Home() {
	// // 메인 페이지 신간 도서
	// const response = await fetch('http://localhost:8080/api/new', {
	// 	cache: 'no-cache',
	// });
	// const newBookItems: NewBookType[] = await response.json();

	// 메인 페이지에 필요한 new, best, used api
	const response = await Promise.all([
		fetch('http://localhost:8080/api/new', { cache: 'no-cache' }),
		fetch('http://localhost:8080/api/best', { cache: 'no-cache' }),
		fetch('http://localhost:8080/api/used', { cache: 'no-cache' }),
	]);
	const [newBookResponse, bestSellerResponse, usedBookResponse] = response;

	// 신간 도서(6개), 베스트셀러(5개), 중고 도서(6개) 아이템을 각 변수에 할당
	const newBookItems: NewBookType[] = await newBookResponse.json();
	const bestSellerItems: BestSellerType[] = await bestSellerResponse.json();
	const usedBookItems: UsedBookType[] = await usedBookResponse.json();

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
