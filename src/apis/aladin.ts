import { NewBookType, RootNewBookType } from '@/types/newBookType';
import { NextApiRequest, NextApiResponse } from 'next';

// 신간도서 페이지에 뿌려줄 신간 리스트
// export const newBookData: RootNewBookType =  fetch(
// 	`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
// 	{ cache: 'force-cache' },
// ).then((data) => {
// 	return data.json();
// });

// // 신간리스트의 item만 추출해 newItem에 할당
// const newItem: NewBookType[] = newBookData?.item?.flatMap((book) => book);

export const getNewBookData = async () => {
	const response = await fetch(
		// `http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		'/aladin/getNewBookData',
		{ cache: 'force-cache' },
	);
	const data = await response.json();
	return data.item.flatMap((book: NewBookType) =>
		book.categoryName.split('>')[1] !== '만화' ? [book] : [],
	);
};
