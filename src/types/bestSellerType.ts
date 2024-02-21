export interface RootBestSellerType {
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
	item: BestSellerType[];
}

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
