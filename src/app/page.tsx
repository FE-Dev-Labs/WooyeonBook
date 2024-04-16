import styles from '@/styles/main/main.module.css';
import Slider from '@/components/main/slider/Slider';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import BestSeller from '@/components/common/BestSeller';
import UsedBook from '@/components/main/usedBook/UsedBook';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { getMainPageData } from '@/apis/main/getMainPageData';

export default async function Home() {
	// main page data
	const { newBookItem, bestSellerItem, usedBookItem } = await getMainPageData();

	return (
		<div className={styles.container}>
			<aside />
			<main className={styles.wrapper}>
				<Slider />
				<NewBook data={newBookItem} />
				<ThemeRecommendation />
				<BestSeller data={bestSellerItem} />
				<UsedBook data={usedBookItem} />
			</main>
			<aside>
				<RecentlyViewedBooks />
			</aside>
		</div>
	);
}
