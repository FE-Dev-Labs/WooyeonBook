export interface BookDataType {
	id: string;
	title: string;
	author: string;
	publisher: string;
	startIndex: string;
	description: string;
	pubDate: string;
	priceStandard: number;
	priceSales: number;
	mileage: number;
	delivery: number;
	isbn: string;
	cover: string;
	categoryName: string;
	itemPage: number;
	packing: {
		styleDesc: string;
		weight: number;
		sizeDepth: number;
		sizeHeight: number;
		sizeWidth: number;
	};
	usedList: {
		aladinUsed: {
			itemCount: number;
			minPrice: number;
			link: string;
		};
	};
	subInfo: {
		ebookList: {
			itemId: number;
			isbn: string;
			isbn13: string;
			priceSales: number;
			link: string;
		}[];
	};
}
