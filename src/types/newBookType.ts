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
	item: NewBookType;
}

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
	seriesInfo: object;
	subInfo: object;
}
