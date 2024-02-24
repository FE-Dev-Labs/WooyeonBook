import { NewBookType, RootNewBookType } from '@/types/newBookType';
import { NextApiRequest, NextApiResponse } from 'next';

export const aladinData = async (req: NextApiRequest, res: NextApiResponse) => {
	// 신간도서 페이지에 뿌려줄 신간 리스트
	const newBookData: RootNewBookType = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});

	// 신간리스트의 item만 추출해 newItem에 할당
	const newItem: NewBookType[] = newBookData?.item?.flatMap((book) => book);

	res.status(200).json(newItem);
};
