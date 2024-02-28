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
	mallType: string;
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
	mallType: string;
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
