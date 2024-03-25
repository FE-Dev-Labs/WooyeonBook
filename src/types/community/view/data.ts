interface BookReportDataType {
	doc_id: string;
	title: string;
	content: string;
	like: number;
	view: number;
	user_name: string;
	created_user: string;
	created_at: Date;
	field: string;
	content_img_url: string[];
	book_name: string;
	book_img_url: string;
	book_id: string;
	category: string;
}

interface BookMeetingDataType {
	doc_id: string;
	title: string;
	content: string;
	like: number;
	view: number;
	user_name: string;
	created_user: string;
	created_at: Date;
	field: string;
	content_img_url: string[];
	state: boolean;
	recruitment_number: number;
	deadline: Date;
	chatting_url: string;
}

interface BookBuyingDataType {
	doc_id: string;
	title: string;
	content: string;
	like: number;
	view: number;
	user_name: string;
	created_user: string;
	created_at: Date;
	field: string;
	book_name: string;
	book_img_url: string;
	category: string;
	content_img_url: string[];
	price: number;
	state: boolean;
	book_id: string;
}

interface BookSellingDataType {
	doc_id: string;
	title: string;
	content: string;
	like: number;
	view: number;
	user_name: string;
	created_user: string;
	created_at: Date;
	field: string;
	book_name: string;
	book_img_url: string;
	category: string;
	content_img_url: string[];
	price: number;
	state: boolean;
	selling: boolean;
	book_id: string;
}
interface AllDataType {
	doc_id: string;
	created_at: Date;
	created_user: string;
	title: string;
	content: string;
	content_img_url: string[];
	user_name: string;
	like: number;
	view: number;
	filed: string;
	book_name?: string;
	book_id?: string;
	book_img_url?: string;
	price?: number;
	state?: boolean;
	selling?: boolean;
	recruitment_number?: number;
	deadline?: Date;
	chatting_url?: string;
}
export type {
	BookReportDataType,
	BookMeetingDataType,
	BookBuyingDataType,
	BookSellingDataType,
	AllDataType,
};
