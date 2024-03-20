import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import UsedBook from '@/components/main/usedBook/UsedBook';
import BestSeller from '@/components/common/BestSeller';
import MainSlider from '@/components/main/mainSlider/MainSlider';
import { fetchMainPageData } from '@/apis/main/main';

export default async function Home() {
	// api 폴더에서 import 해온 신간도서, 베스트셀러, 중고도서 아이템
	const { newBookItem, bestSellerItem, usedBookItem } =
		await fetchMainPageData();

	return (
		<main className={styles.container}>
			<div />
			<div className={styles.wrapper}>
				<MainSlider />
				<NewBook data={newBookItem} />
				<ThemeRecommendation />
				<BestSeller data={bestSellerItem} />
				<UsedBook data={usedBookItem} />
			</div>
			<div>
				<RecentlyViewedBooks />
			</div>
		</main>
	);
}
