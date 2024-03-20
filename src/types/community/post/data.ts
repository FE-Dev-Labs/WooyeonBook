interface BookReportPostDataType {
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

interface BookMeetingPostDataType {
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

interface BookBuyingPostDataType {
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

interface BookSellingPostDataType {
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
	BookReportPostDataType,
	BookMeetingPostDataType,
	BookBuyingPostDataType,
	BookSellingPostDataType,
};
