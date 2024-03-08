import {
	bookBuyingSumitData,
	bookMeetingSumitData,
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
	router: any;
}

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
	router,
}: BookSellingOnSubmitProps) => {
	const data = bookSellingSumitData({
		title: title.value as string,
		text,
		selectedBook,
		page,
		sellingPrice: price.value as string,
		bookState,
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

export { bookMeetingOnSubmit, bookBuyingOnSubmit, bookSellingOnSubmit };
