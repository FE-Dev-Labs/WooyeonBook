// props 타입
interface communityPostDataProps {
	page: string | null;
	title: string;
	text: string;
	recruitmentNumber: number;
	chatUrl: string;
	deadline: Date;
	bookState: string;
	sellingState: string;
	sellingPrice: string;
	book_Id: string;
}
//데이터 공용 타입
interface postDataType {
	created_at: Date;
	created_user: string;
	title: string;
	content: string;
	user_name: string;
	field: string | null;
	view: number;
	like: number;
}
//독후감 데이터 타입
interface bookReportDataType extends postDataType {
	book_name: string;
	book_img_url: string;
	category: string;
	content_img_url: string[];
	book_id: string;
}
//모임 데이터 타입
interface bookMeetingDataType extends postDataType {
	content_img_url: string[];
	state: boolean;
	recruitment_number: number;
	deadline: Date;
	chatting_url: string;
}
//삽니다, 팝니다 데이터 타입
interface bookBuyingDataType extends postDataType {
	book_name: string;
	book_img_url: string;
	category: string;
	content_img_url: string[];
	price: string;
	state: boolean;
	book_id: string;
}
interface bookSellingDataType extends postDataType {
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
/**
 * @description
 * 커뮤니티 게시글 데이터를 생성하는 함수
 * @param {string} page - 게시글의 페이지
 * @param {string} title - 게시글의 제목
 * @param {string} text - 게시글의 내용
 * @param {number} recruitmentNumber - 모임의 모집인원
 * @param {string} chatUrl - 모임의 채팅 url
 * @param {Date} deadline - 모임의 마감일
 * @param {string} bookState - 책 상태
 * @param {string} sellingState - 판매 상태
 * @param {string} sellingPrice - 판매 가격
 * @returns {object} - 게시글 데이터
 */

export const communityPostData = ({
	page,
	title,
	text,
	recruitmentNumber,
	chatUrl,
	deadline,
	bookState,
	sellingState,
	sellingPrice,
	book_Id,
}: communityPostDataProps) => {
	// 독후감 데이터
	const bookReportSumitData: bookReportDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img_url: [],
		user_name: 'user-name',
		book_id: book_Id,
		book_name: 'book-name',
		book_img_url: 'book-img',
		field: page,
		category: 'category',
		view: 0,
		like: 0,
	};
	// 모임 데이터
	const bookMeetingSumitData: bookMeetingDataType = {
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
	// 삽니다 데이터
	const bookBuyingSumitData: bookBuyingDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img_url: [],
		user_name: 'user-name',
		book_name: 'book-name',
		book_img_url: 'book-img',
		book_id: book_Id,
		field: page,
		category: 'category',
		view: 0,
		price: '0',
		like: 0,
		state: false,
	};
	// 팝니다 데이터
	const bookSellingSumitData: bookSellingDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img_url: [],
		user_name: 'user-name',
		book_name: 'book-name',
		book_id: book_Id,
		book_img_url: 'book-img',
		field: page,
		category: 'category',
		view: 0,
		price: sellingPrice,
		like: 0,
		state: false,
		book_state: bookState,
		selling_state: sellingState,
	};
	// 데이터를 반환
	if ((page = 'bookReport')) {
		return bookReportSumitData;
	}
	if ((page = 'bookMeeting')) {
		return bookMeetingSumitData;
	}
	if ((page = 'bookBuying')) {
		return bookBuyingSumitData;
	}
	if ((page = 'bookSelling')) {
		return bookSellingSumitData;
	}
	return null;
};
