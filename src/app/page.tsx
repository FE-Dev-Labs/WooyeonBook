import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import UsedBook from '@/components/main/usedBook/UsedBook';
import BestSeller from '@/components/common/BestSeller';
import MainSlider from '@/components/main/mainSlider/MainSlider';

export default async function Home() {
	const listData = await fetch(
		// 'https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttb0113byi1704001&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101',

		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewAll&SearchTarget=Book&output=js&Version=20131101`,

		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});

	const newBookData = await fetch(
		// 'https://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=ttb0113byi1704001&QueryType=ItemNewAll&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101',

		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,

		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});

	console.log(newBookData);
	console.log(newBookData.item.length);

	return (
		<main className={styles.container}>
			<div />
			<div className={styles.wrapper}>
				<MainSlider />
				<NewBook newBookData={newBookData} />
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
