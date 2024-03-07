export interface ResponseData {
	item: Book[];
}
export interface Book {
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
	fixedPrice: true;
	customerReviewRank: number;
	subInfo: SubInfo;
}

export interface SubInfo {
	ebookList: Ebook[];
	usedList: UsedList;
	subTitle: string;
	originalTitle: string;
	itemPage: number;
	packing: Packing;
	subBarcode: string;
}

export interface Ebook {
	itemId: number;
	isbn: string;
	isbn13: string;
	priceSales: number;
	link: string;
}

export interface UsedList {
	aladinUsed: UsedItem;
	userUsed: UsedItem;
	spaceUsed: UsedItem;
}

export interface UsedItem {
	itemCount: number;
	minPrice: number;
	link: string;
}

export interface Packing {
	styleDesc: string;
	weight: number;
	sizeDepth: number;
	sizeHeight: number;
	sizeWidth: number;
}
