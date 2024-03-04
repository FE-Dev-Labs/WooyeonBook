import {
	bookBuyingSumitData,
	bookMeetingSumitData,
	bookReportSumitData,
	bookSellingSumitData,
} from '../postData';
import { supabase } from '@/utils/supabase/supabase';

interface BookReportOnSubmitProps {
	page: string;
	title: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	router: any;
	text: string;
	setText: (value: string) => void;
	selectedBook: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	};
	setSeletedBook: (value: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	}) => void;
}

interface BookMeetingOnSubmitProps {
	page: string;
	title: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	recruitmentNumber: number;
	setRecruitmentNumber: (value: number) => void;
	chatUrl: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	deadline: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	router: any;
	text: string;
	setText: (value: string) => void;
}

interface BookBuyingOnSubmitProps {
	page: string;
	title: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	price: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	router: any;
	text: string;
	setText: (value: string) => void;
	selectedBook: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	};
	setSeletedBook: (value: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	}) => void;
}

interface BookSellingOnSubmitProps {
	page: string;
	title: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	text: string;
	setText: (value: string) => void;
	selectedBook: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	};
	setSeletedBook: (value: {
		bookId: string;
		bookName: string;
		bookImgUrl: string;
	}) => void;
	price: {
		value: string | number | Date;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
		init: () => void;
	};
	bookState: string;
	sellingState: string;
	router: any;
}

// 독후감 작성시 데이터 삽입
const bookReportOnSubmit = async ({
	page,
	title,
	router,
	text,
	setText,
	selectedBook,
	setSeletedBook,
}: BookReportOnSubmitProps) => {
	// page별 데이터 생성
	const data = bookReportSumitData({
		page,
		title: title.value as string,
		text,
		selectedBook,
	});
	// supabase 데이터베이스에 데이터 삽입
	const { error } = await supabase.from(`${page}`).insert([data]);
	// 에러 발생시 alert
	if (error) {
		return alert('에러가 발생했습니다.');
	}
	// state 초기화
	title.init();
	setText('');
	setSeletedBook({
		bookName: '',
		bookImgUrl: '',
		bookId: '',
	});
	// created_user,user_name 아직 안넣음
	// 데이터 삽입후 페이지 이동
	return router.push(`/community/${page}`);
};

const bookMeetingOnSubmit = async ({
	page,
	title,
	recruitmentNumber,
	setRecruitmentNumber,
	chatUrl,
	deadline,
	router,
	text,
	setText,
}: BookMeetingOnSubmitProps) => {
	const data = bookMeetingSumitData({
		page,
		title: title.value as string,
		text,
		recruitmentNumber,
		chatUrl: chatUrl.value as string,
		deadline: deadline.value as Date,
	});
	const { error } = await supabase.from(`${page}`).insert([data]);
	if (error) {
		return alert('에러가 발생했습니다.');
	}
	title.init();
	setText('');
	setRecruitmentNumber(0);
	chatUrl.init();
	deadline.init();
	return router.push(`/community/${page}`);
};

const bookBuyingOnSubmit = async ({
	page,
	title,
	price,
	router,
	text,
	setText,
	selectedBook,
	setSeletedBook,
}: BookBuyingOnSubmitProps) => {
	const data = bookBuyingSumitData({
		title: title.value as string,
		text,
		selectedBook,
		page,
		price: price.value as string,
	});
	const { error } = await supabase.from(`${page}`).insert([data]);
	if (error) {
		return alert('에러가 발생했습니다.');
	}
	title.init();
	setText('');
	price.init();
	setSeletedBook({
		bookName: '',
		bookImgUrl: '',
		bookId: '',
	});
	return router.push(`/community/${page}`);
};

const bookSellingOnSubmit = async ({
	title,
	text,
	setText,
	selectedBook,
	setSeletedBook,
	page,
	price,
	bookState,
	sellingState,
	router,
}: BookSellingOnSubmitProps) => {
	const data = bookSellingSumitData({
		title: title.value as string,
		text,
		selectedBook,
		page,
		sellingPrice: price.value as string,
		bookState,
		sellingState,
	});
	const { error } = await supabase.from(`${page}`).insert([data]);
	if (error) {
		return alert('에러가 발생했습니다.');
	}
	title.init();
	setText('');
	price.init();
	setSeletedBook({
		bookName: '',
		bookImgUrl: '',
		bookId: '',
	});
	return router.push(`/community/${page}`);
};

export {
	bookReportOnSubmit,
	bookMeetingOnSubmit,
	bookBuyingOnSubmit,
	bookSellingOnSubmit,
};
