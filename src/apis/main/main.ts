import { BestSellerType, NewBookType, UsedBookType } from '@/types/bookType';

export const fetchMainPageData = async () => {
	// 데이터 패치해오는 함수
	const fetchData = async (url: string) => {
		const response = await fetch(url, { cache: 'force-cache' });
		return await response.json();
	};

	// 각각 신간도서, 베스트셀러, 중고도서 패치해온 데이터
	const newBooksPromise = fetchData(newBooksURL);
	const bestSellerPromise = fetchData(bestSellerURL);
	const usedBooksPromise = fetchData(usedBooksURL);

	// 3개의 Promise가 해결될 때까지 기다린 후 결과를 배열로 반환
	const [newBookData, bestSellerData, usedBookData] = await Promise.all([
		newBooksPromise,
		bestSellerPromise,
		usedBooksPromise,
	]);

	// 메인 - 신간도서
	// 신간리스트의 item만 추출해 newBookItem 할당
	const newBookItem = (newBookData.item as NewBookType[])
		// 소설/시/희곡 키워드가 포함된 아이템만 필터링
		.filter((item) => item.categoryName.includes('소설/시/희곡'))
		// 앞에서 6개만 추출

		.slice(0, 6);

	// 메인 - 베스트셀러
	// 베스트셀러의 item만 추출해 bestSellerItem 할당
	const bestSellerItem = (bestSellerData.item as BestSellerType[])
		// 베스트셀러 item을 rank 낮은순 소팅
		.sort((a, b) => a.bestRank - b.bestRank)
		// 앞에서 5개만 추출
		.slice(0, 5);

	// 메인 - 중고도서
	// 중고도서 리스트의 item만 추출해 data에 할당
	const usedBookItem = (usedBookData.item as UsedBookType[])
		// 중고도서 리스트의 item을 salesPoint 높은순 소팅
		.sort((a, b) => b.salesPoint - a.salesPoint)
		// 앞에서 6개만 추출
		.slice(0, 6);

	return { newBookItem, bestSellerItem, usedBookItem };
};

// 메인 - 신간도서 api 주소
const newBooksURL = `${process.env.NEXT_PUBLIC_BASE_URL}?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=50&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`;
// 메인 - 베스트셀러 api 주소
const bestSellerURL = `${process.env.NEXT_PUBLIC_BASE_URL}?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=Bestseller&MaxResults=10&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`;
// 메인 - 중고도서 api 주소
const usedBooksURL = `${process.env.NEXT_PUBLIC_BASE_URL}?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=itemNewAll&MaxResults=100&start=1&SearchTarget=Used&SubSearchTarget=Book&output=js&Version=20131101&Cover=Big`;
