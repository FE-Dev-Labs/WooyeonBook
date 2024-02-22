export interface RootUsedBookType {
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
	item: UsedBookType[];
}

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
