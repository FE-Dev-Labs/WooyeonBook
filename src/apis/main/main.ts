import {
	BestSellerType,
	NewBookType,
	RootBookType,
	UsedBookType,
} from '@/types/bookType';

// 신간 도서 리스트(6개) : 메인페이지용
// export const getNewBookData = async () => {
// 	const response = await fetch('http://localhost:8080/api/new');
// 	const newBookData: RootBookType = await response.json();

// 	// 신간리스트의 item만 추출해 data에 할당
// 	const data: NewBookType[] = newBookData?.item as NewBookType[];
// 	return data;
// };

// 베스트셀러 리스트(5개): 메인페이지용
// export const getBestBookData = async () => {
// 	const response = await fetch('http://localhost:8080/api/best');
// 	const bestsellerData: RootBookType = await response.json();

// // 베스트셀러의 item을 rank순으로 소팅해 data에 할당
// const data = (bestsellerData.item as BestSellerType[])
// 	.sort((a, b) => a.bestRank - b.bestRank)
// 	.slice(0, -1);
// 	return data;
// };

// 중고 도서 리스트(5개): 메인페이지용
// export const getUsedBookData = async () => {
// 	const response = await fetch('http://localhost:8080/api/used');
// 	const usedBookData: RootBookType = await response.json();

// 	// 신간리스트의 item의 중고책 데이터만 추출해 data 할당
// 	const data =
// 		(usedBookData?.item?.filter(
// 			(book) => book.mallType === 'USED',
// 		) as UsedBookType[]) || [];
// 	return data;
// };
