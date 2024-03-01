import {
	BookReportDataType,
	BookMeetingDataType,
	BookBuyingDataType,
	BookSellingDataType,
} from '@/types/community/post/data';

interface BookReportSumitDataProps {
	title: string;
	text: string;
	selectedBook: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	};
	page: string | null;
}

interface BookMeetingSumitDataProps {
	title: string;
	text: string;
	recruitmentNumber: number;
	deadline: Date;
	page: string | null;
	chatUrl: string;
}

interface BookBuyingSumitDataProps {
	title: string;
	text: string;
	selectedBook: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	};
	page: string | null;
	price: string;
}

interface BookSellingSumitDataProps {
	title: string;
	text: string;
	selectedBook: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	};
	page: string | null;
	sellingPrice: string;
	bookState: string;
	sellingState: string;
}

const bookReportSumitData = ({
	title,
	text,
	selectedBook,
	page,
}: BookReportSumitDataProps) => {
	const data: BookReportDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img_url: [],
		user_name: 'user-name',
		book_id: selectedBook.bookId,
		book_name: selectedBook.bookName,
		book_img_url: selectedBook.bookImgUrl,
		field: page,
		category: 'category',
		view: 0,
		like: 0,
	};
	return data;
};

const bookMeetingSumitData = ({
	title,
	text,
	recruitmentNumber,
	deadline,
	page,
	chatUrl,
}: BookMeetingSumitDataProps) => {
	const data: BookMeetingDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img_url: [],
		user_name: 'user-name',
		state: false,
		recruitment_number: recruitmentNumber,
		deadline: deadline,
		view: 0,
		field: page,
		chatting_url: chatUrl,
		like: 0,
	};
	return data;
};

const bookBuyingSumitData = ({
	title,
	text,
	selectedBook,
	page,
	price,
}: BookBuyingSumitDataProps) => {
	const data: BookBuyingDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img_url: [],
		user_name: 'user-name',
		book_name: selectedBook.bookName,
		book_img_url: selectedBook.bookImgUrl,
		book_id: selectedBook.bookId,
		field: page,
		category: 'category',
		view: 0,
		price: price,
		like: 0,
		state: false,
	};
	return data;
};

const bookSellingSumitData = ({
	title,
	text,
	selectedBook,
	page,
	sellingPrice,
	bookState,
	sellingState,
}: BookSellingSumitDataProps) => {
	const data: BookSellingDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img_url: [],
		user_name: 'user-name',
		book_name: selectedBook.bookName,
		book_id: selectedBook.bookId,
		book_img_url: selectedBook.bookImgUrl,
		field: page,
		category: 'category',
		view: 0,
		price: sellingPrice,
		like: 0,
		state: false,
		book_state: bookState,
		selling_state: sellingState,
	};
};

export {
	bookReportSumitData,
	bookMeetingSumitData,
	bookBuyingSumitData,
	bookSellingSumitData,
};
