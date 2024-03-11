interface BookReportDataType {
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

export type {
	BookReportDataType,
	BookMeetingDataType,
	BookBuyingDataType,
	BookSellingDataType,
};
