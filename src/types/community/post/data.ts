interface PostDataType {
	created_at: Date;
	created_user: string;
	title: string;
	content: string;
	user_name: string;
	field: string | null;
	view: number;
	like: number;
}
interface BookReportDataType extends PostDataType {
	book_name: string;
	book_img_url: string;
	category: string;
	content_img_url: string[];
	book_id: string;
}

interface BookMeetingDataType extends PostDataType {
	content_img_url: string[];
	state: boolean;
	recruitment_number: number;
	deadline: Date;
	chatting_url: string;
}

interface BookBuyingDataType extends PostDataType {
	book_name: string;
	book_img_url: string;
	category: string;
	content_img_url: string[];
	price: string;
	state: boolean;
	book_id: string;
}

interface BookSellingDataType extends PostDataType {
	book_name: string;
	book_img_url: string;
	category: string;
	content_img_url: string[];
	price: string;
	state: boolean;
	book_state: string;
	selling_state: string;
	book_id: string;
}

export type {
	PostDataType,
	BookReportDataType,
	BookMeetingDataType,
	BookBuyingDataType,
	BookSellingDataType,
};
