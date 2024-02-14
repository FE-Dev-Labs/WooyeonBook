import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import UsedBook from '@/components/main/usedBook/UsedBook';
import BestSeller from '@/components/common/BestSeller';
import MainSlider from '@/components/main/mainSlider/MainSlider';

export default async function Home() {
	const data = await fetch(
		'https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttbkjhhj991430001&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101',
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});
	console.log(data);
	return (
		<main className={styles.container}>
			<div />
			<div className={styles.wrapper}>
				<MainSlider />
				<NewBook />
				<ThemeRecommendation />
				<BestSeller />
				<UsedBook />
			</div>
			<div>
				<RecentlyViewedBooks />
			</div>
		</main>
	);
}
