import styles from '@/styles/main/main.module.css';
import Slider from '@/components/main/slider/Slider';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import BestSeller from '@/components/common/BestSeller';
import UsedBook from '@/components/main/usedBook/UsedBook';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { getMainPageData } from '@/apis/main/getMainPageData';

export default async function Home() {
	// api 폴더에서 import 해온 신간도서, 베스트셀러, 중고도서 아이템
	const { newBookItem, bestSellerItem, usedBookItem } = await getMainPageData();

	return (
		<main className={styles.container}>
			<div />
			<div className={styles.wrapper}>
				<Slider />
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
