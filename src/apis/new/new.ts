import { NewBookType, RootBookType } from '@/types/bookType';

// 신간 도서 리스트(6개) : 메인페이지용
export const getAllNewBookData = async () => {
	const response = await fetch('http://localhost:8080/api/newAll');
	const newBookData: RootBookType = await response.json();

	// 신간리스트의 item만 추출해 data에 할당
	const data: NewBookType[] = newBookData?.item as NewBookType[];
	return data;
};
