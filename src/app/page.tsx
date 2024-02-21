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

	// 메인 페이지에 뿌려줄 신간 리스트 (6개)
	const newBookData = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});

	// 메인 페이지에 뿌려줄 베스트셀러 리스트 5개 (MaxResults=5일 경우 4개 아이템만 받아올 수 있어 MaxResults=6으로 받아온 후 data를 잘라서 사용함)
	const bestSellerData = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=Bestseller&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});
	const bestItem = bestSellerData.item
		.sort((a: any, b: any) => b.item?.bestRank - a.item?.bestRank)
		.slice(0, 5);

	console.log(newBookData);
	// console.log(bestSellerData.item.length);

	return (
		<main className={styles.container}>
			<div />
			<div className={styles.wrapper}>
				<MainSlider />
				<NewBook data={newBookData} />
				<ThemeRecommendation />
				<BestSeller data={bestItem} />
				<UsedBook />
			</div>
			<div>
				<RecentlyViewedBooks />
			</div>
		</main>
	);
}
