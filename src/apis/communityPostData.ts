interface communityPostDataProps {
	page: string | null;
	title: string;
	text: string;
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
	content_img: string[];
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
interface bookBuyingSellingDataType extends postDataType {
	book_name: string;
	book_img_url: string;
	category: string;
	content_img: string[];
	price: number;
	state: boolean;
}
/**
 * @description
 * 커뮤니티 게시글 데이터를 생성하는 함수
 * @param {string} page - 게시글의 페이지
 * @param {string} title - 게시글의 제목
 * @param {string} text - 게시글의 내용
 * @returns {object} - 게시글 데이터
 */

export const communityPostData = ({
	page,
	title,
	text,
}: communityPostDataProps) => {
	// 독후감 데이터
	const bookReportSumitData: bookReportDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img: [],
		user_name: 'user-name',
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
		recruitment_number: 0,
		deadline: new Date(),
		view: 0,
		field: page,
		chatting_url: 'chatting-url',
		like: 0,
	};
	// 삽니다, 팝니다 데이터
	const bookBuyingSellingSumitData: bookBuyingSellingDataType = {
		created_at: new Date(),
		created_user: 'user-uuid',
		title: title,
		content: text,
		content_img: [],
		user_name: 'user-name',
		book_name: 'book-name',
		book_img_url: 'book-img',
		field: page,
		category: 'category',
		view: 0,
		price: 0,
		like: 0,
		state: false,
	};
	// 데이터를 반환
	if ((page = 'bookReport')) {
		return bookReportSumitData;
	}
	if ((page = 'bookMeeting')) {
		return bookMeetingSumitData;
	}
	if ((page = 'bookBuying')) {
		return bookBuyingSellingSumitData;
	}
	if ((page = 'bookSeling')) {
		return bookBuyingSellingSumitData;
	}
	return null;
};
