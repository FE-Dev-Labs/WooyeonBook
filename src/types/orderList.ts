export interface CartItem {
	id: number;
	title: string;
	author: string;
	publisher: string;
	priceSales: number;
	priceStandard: number;
	isbn: string;
	cover: string;
	mallType: string;
	quantity: number;
	itemTotalPrice: number;
}

export interface BookOrderList {
	user_id: string;
	created_at: Date;
	cart: CartItem[]; // 또는 cart가 배열이라면 CartItem[]
	cart_id: string;
	totalOrderPrice: number;
}
