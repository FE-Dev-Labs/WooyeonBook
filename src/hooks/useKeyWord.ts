// import { useEffect, useState } from 'react';
// import { Book } from '@/types/bookDetailDate';
// import axios from 'axios';

// export default function useKeyWord(initialValue: string | number | Date) {
// 	// 자동 검색어
// 	const [keyword, setKeyword] = useState(initialValue);
// 	// 검색어 책 데이터 배열에 넣기
// 	const [searchData, setSearchData] = useState<Book[]>([]);

// 	const getdata = async () => {
// 		try {
// 			const { data } = await axios.get(
// 				`http://localhost:8080/search/keyword?keyword=${keyword}`,
// 			);
// 			setSearchData(data);
// 		} catch (err) {
// 			console.error(err);
// 		}
// 	};
// 	useEffect(() => {
// 		const debounce = setTimeout(() => {
// 			const word = keyword as string;
// 			if (word.length > 0) {
// 				getdata();
// 			}
// 		}, 400);
// 		return () => clearTimeout(debounce);
// 	}, [keyword]);
// 	return { keyword, setKeyword, searchData };
// }
