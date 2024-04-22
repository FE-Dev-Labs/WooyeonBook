import { StaticImageData } from 'next/image';
import uuid from 'react-uuid';

export interface RootBookType {
	version: string;
	logo: string;
	title: string;
	link: string;
	pubDate: string;
	totalResults: number;
	startIndex: number;
	itemsPerPage: number;
	query: string;
	searchCategoryId: number;
	searchCategoryName: string;
	item: NewBookType[] | BestSellerType[] | UsedBookType[];
}

// 신간 도서
export interface NewBookType {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	itemId: number;
	priceSales: number;
	priceStandard: number;
	mallType: 'BOOK';
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	salesPoint: number;
	adult: boolean;
	fixedPrice: boolean;
	customerReviewRank: number;
	seriesInfo?: object;
	subInfo: object;
}

// 베스트셀러
export interface BestSellerType {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	itemId: number;
	priceSales: number;
	priceStandard: number;
	mallType: 'BOOK';
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	salesPoint: number;
	adult: boolean;
	fixedPrice: boolean;
	customerReviewRank: number;
	bestDuration: string;
	bestRank: number;
	seriesInfo?: object;
	subInfo: Record<string, unknown>;
}

// 중고 도서
export interface UsedBookType {
	title: string;
	link: string;
	author: string;
	pubDate: string;
	description: string;
	isbn: string;
	isbn13: string;
	itemId: number;
	priceSales: number;
	priceStandard: number;
	mallType: 'USED';
	stockStatus: string;
	mileage: number;
	cover: string;
	categoryId: number;
	categoryName: string;
	publisher: string;
	salesPoint: number;
	adult: false;
	customerReviewRank: number;
	subInfo: object;
}

// 장바구니에 들어갈 아이템 타입
export interface CartItemType {
	userid: string;
	title: string;
	author: string;
	publisher: string;
	priceStandard: number;
	priceSales: number;
	isbn: string;
	cover: string;
	mallType: string;
	quantity: number;
	itemTotalPrice: number;
}

// 최근 본 상품 타입
export interface RecentlyViewedBookType {
	itemIsbn: string;
	itemCover: string;
	itemMallType: string;
}

// 추천 상품 타입
export interface RecommendedDataType {
	id: number;
	artistName: string;
	tag: string;
	color: string;
	image: StaticImageData;
	book: any;
}
