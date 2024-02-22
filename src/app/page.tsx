import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import UsedBook from '@/components/main/usedBook/UsedBook';
import BestSeller from '@/components/common/BestSeller';
import MainSlider from '@/components/main/mainSlider/MainSlider';
import { NewBookType, RootNewBookType } from '@/types/newBookType';
import { BestSellerType, RootBestSellerType } from '@/types/bestSellerType';
import { RootUsedBookType, UsedBookType } from '@/types/UsedBookType';

export default async function Home() {
	// 메인 페이지에 뿌려줄 신간 리스트 6개
	const newBookData: RootNewBookType = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});
	// 신간리스트의 item만 추출해 newItem에 할당
	const newItem: NewBookType[] = newBookData?.item?.flatMap((book) => book);

	// 메인 페이지에 뿌려줄 베스트셀러 리스트 5개 (MaxResults=5일 경우 4개 아이템만 받아올 수 있어 MaxResults=6으로 받아온 후 data를 잘라서 사용함)
	const bestSellerData: RootBestSellerType = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=Bestseller&MaxResults=6&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});
	// 베스트셀러를 bestRank 순으로 소팅
	const bestItem: BestSellerType[] = bestSellerData?.item
		?.sort((a: BestSellerType, b: BestSellerType) => a.bestRank - b.bestRank)
		.slice(0, 5);

	// 메인 페이지에 뿌려줄 중고책 리스트 6개
	const usedBookData: RootUsedBookType = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewAll&MaxResults=6&start=1&SearchTarget=Used&SubSearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});
	// 신간리스트의 item만 추출해 usedItem에 할당
	const usedItem: UsedBookType[] = usedBookData?.item?.flatMap((book) => book);

	return (
		<main className={styles.container}>
			<div />
			<div className={styles.wrapper}>
				<MainSlider />
				<NewBook data={newItem} />
				<ThemeRecommendation />
				<BestSeller data={bestItem} />
				<UsedBook data={usedItem} />
			</div>
			<div>
				<RecentlyViewedBooks />
			</div>
		</main>
	);
}
