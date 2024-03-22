// 'use client';

// import CategoryBar from '@/components/category/categoryBar/CategoryBar';
// import CategoryContents from '@/components/category/categoryContents/CategoryContents';
// import PageHeader from '@/components/common/PageHeader';
// import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
// import styles from '@/styles/category/category.module.css';
// import { NewBookType } from '@/types/bookType';
// import { useSearchParams } from 'next/navigation';
// import { useEffect, useState } from 'react';

// export default function categoryPage() {
// 	// useSearchParams 호출
// 	const params = useSearchParams();
// 	// url 내 categoryId 추출
// 	const categoryId = params.get('categoryId');
// 	// 신간 도서 전체 아이템 state
// 	const [newAllItem, setNewAllItem] = useState<NewBookType[]>([]);
// 	// 현재 카테고리의 페이지 state
// 	const [currentPage, setCurrentPage] = useState<number>(1);
// 	// 현재 카테고리 아이템의 총 갯수 state
// 	const [itemLength, setItemLength] = useState<number>(0);

// 	// 현재 선택된 카테고리 아이템 찾기
// 	const currentCategoryItem = categoryItem.find(
// 		(item) => item.id === Number(categoryId),
// 	);

// 	// 각 페이지(숫자) 선택 시 실행되는 함수(페이지네이션)
// 	const handlePageNumClick = (pageNum: number) => {
// 		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
// 		if (currentPage === pageNum) return;
// 		// 현재 페이지 숫자 변경
// 		setCurrentPage(pageNum);
// 		// 페이지 선택시 페이지 상단으로 스크롤 이동
// 		window.scrollTo({ top: 300, behavior: 'smooth' });
// 	};

// 	// // server -> api 받아오는 함수
// 	// const fetchData = async () => {
// 	// 	const response = await fetch(
// 	// 		`http://localhost:8080/list/newAll?categoryId=${categoryId}&page=${currentPage}`,
// 	// 		{ cache: 'force-cache' },
// 	// 	);
// 	// 	const { data, dataLength } = await response.json();
// 	// 	// book item
// 	// 	setNewAllItem(data);
// 	// 	// book item의 총 개수
// 	// 	setItemLength(dataLength);
// 	// };

// 	// // fetchData 뿌려주는 useEffect
// 	// useEffect(() => {
// 	// 	fetchData();
// 	// }, [categoryId, currentPage]);

// 	const [testData, setTestData] = useState([]);
// 	const [testDataLength, setTestDataLength] = useState(0);
// 	const newAllTestData = async () => {
// 		const response = await fetch(
// 			`http://localhost:8080/list/newAllTest?categoryId=${categoryId}&page=${currentPage}`,
// 			{
// 				cache: 'force-cache',
// 			},
// 		);
// 		const { data, dataLength } = await response.json();
// 		console.log(data);
// 		console.log(dataLength);
// 		console.log(categoryId);

// 		setTestData(data);
// 		setTestDataLength(dataLength);
// 	};
// 	useEffect(() => {
// 		newAllTestData();
// 	}, [categoryId]);

// 	return (
// 		<>
// 			<PageHeader
// 				title={currentCategoryItem ? currentCategoryItem.name : '전체'}
// 			/>
// 			<div className={styles.container}>
// 				<div />
// 				<div className={styles.wrapper}>
// 					<CategoryBar />
// 					<CategoryContents
// 						data={newAllItem}
// 						itemLength={itemLength}
// 						handlePageNumClick={handlePageNumClick}
// 						currentPage={currentPage}
// 					/>
// 				</div>
// 				<div>
// 					<RecentlyViewedBooks />
// 				</div>
// 			</div>
// 		</>
// 	);
// }

// // 카테고리 분류
// const categoryItem = [
// 	{ name: '전체', id: 0 },
// 	{ name: '건강/취미', id: 55890 },
// 	{ name: '경제경영', id: 170 },
// 	{ name: '공무원 수험서', id: 34582 },
// 	{ name: '과학', id: 987 },
// 	// { name: '달력/기타', id: 4395 },
// 	{ name: '대학교재', id: 8257 },
// 	{ name: '만화', id: 2551 },
// 	{ name: '사회과학', id: 798 },
// 	{ name: '소설/시/희곡', id: 1 },
// 	{ name: '수험서/자격증', id: 1383 },
// 	{ name: '어린이', id: 1108 },
// 	{ name: '에세이', id: 55889 },
// 	{ name: '여행', id: 1196 },
// 	{ name: '역사', id: 74 },
// 	{ name: '예술/대중문화', id: 517 },
// 	{ name: '외국어', id: 1322 },
// 	{ name: '요리/살림', id: 1230 },
// 	{ name: '유아', id: 13789 },
// 	{ name: '인문학', id: 656 },
// 	{ name: '자기계발', id: 336 },
// 	{ name: '잡지', id: 2913 },
// 	{ name: '장르소설', id: 112011 },
// 	{ name: '전집/중고전집', id: 17195 },
// 	{ name: '종교/역학', id: 1237 },
// 	{ name: '좋은부모', id: 2030 },
// 	{ name: '청소년', id: 1137 },
// 	{ name: '컴퓨터/모바일', id: 351 },
// 	{ name: '초등학교참고서', id: 50246 },
// 	{ name: '중학교참고서', id: 76000 },
// 	{ name: '고등학교참고서', id: 76001 },
// ];

'use client';

import styles from '@/styles/category/category.module.css';
import CategoryBar from '@/components/category/categoryBar/CategoryBar';
import CategoryContents from '@/components/category/categoryContents/CategoryContents';
import PageHeader from '@/components/common/PageHeader';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import { NewBookType } from '@/types/bookType';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { sortTypeState } from '@/recoil/atom/sortTypeAtom';

export default function newPage() {
	// useSearchParams 호출
	const params = useSearchParams();
	// url 내 categoryId 추출
	const categoryId = params.get('categoryId');
	// 해당 카테고리 전체 아이템 state
	const [newAllItem, setNewAllItem] = useState<NewBookType[]>([]);
	// 해당 카테고리 아이템 갯수 state
	const [dataLength, setDataLength] = useState<number>(0);
	// 해당 카테고리 페이지 갯수 state
	const [pageLength, setPageLength] = useState<number>(1);
	// 현재 카테고리의 페이지 state
	const [currentPage, setCurrentPage] = useState<number>(1);
	// 소팅 state(제목순, 최신순)
	const sortType = useRecoilValue(sortTypeState);

	// server -> api 받아오는 함수
	const fetchData = async () => {
		const response = await fetch(
			`http://localhost:8080/list/newAllTest?categoryId=${categoryId}`,
		);
		const { data, dataLength, pageLength } = await response.json();

		// 필터링하고자 하는 itemId 목록
		const excludeItemIds = [
			336540600, 336575362, 336575314, 336736439, 336731190, 336734731,
			336732928, 336733515, 336732928, 336616984, 336516899, 336593889,
			336514238, 336611587, 336595673, 336429171,
		];

		// excludeItemIds에 포함되지 않은 아이템만 필터링
		const filteredData = data.filter(
			(item: NewBookType) => !excludeItemIds.includes(item.itemId),
		);

		// 해당 카테고리 all item
		setNewAllItem(filteredData);
		// 해당 카테고리 아이템 갯수
		setDataLength(dataLength);
		// 해당 카테고리 페이지네이션에 필요한 숫자
		setPageLength(pageLength);
	};

	// 현재 선택된 카테고리 아이템 찾기
	const currentCategoryItem = categoryItem.find(
		(item) => item.id === Number(categoryId),
	);

	// 현재 카테고리의 각 페이지(숫자) 선택 시 실행되는 함수
	const handlePageNumClick = (pageNum: number) => {
		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
		if (currentPage === pageNum) return;
		// 현재 페이지 숫자 변경
		setCurrentPage(pageNum);
		// 페이지 선택시 페이지 상단으로 스크롤 이동
		window.scrollTo({ top: 300, behavior: 'smooth' });
	};

	// 소팅한 data
	const sortedData =
		// 제목순일 때의 sort
		sortType === '제목순'
			? newAllItem.sort((a, b) => a.title.localeCompare(b.title))
			: // 제목순이 아닐 떄의 sort(최신순). 비교군이 2가지라서 삼항연산자로 만들어 놓음
				newAllItem.sort(
					(a, b) =>
						new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
				);

	// fetchData 뿌려주는 useEffect
	useEffect(() => {
		fetchData();
	}, [categoryId]);

	return (
		<>
			<PageHeader
				title={currentCategoryItem ? currentCategoryItem.name : '전체'}
			/>
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<CategoryBar />
					<CategoryContents
						data={sortedData}
						dataLength={dataLength}
						pageLength={pageLength}
						currentPage={currentPage}
						handlePageNumClick={handlePageNumClick}
						page="category"
					/>
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}

// 카테고리 분류
const categoryItem = [
	{ name: '전체', id: 0 },
	{ name: '건강/취미', id: 55890 },
	{ name: '경제경영', id: 170 },
	{ name: '공무원 수험서', id: 34582 },
	{ name: '과학', id: 987 },
	// { name: '달력/기타', id: 4395 },
	{ name: '대학교재', id: 8257 },
	{ name: '만화', id: 2551 },
	{ name: '사회과학', id: 798 },
	{ name: '소설/시/희곡', id: 1 },
	{ name: '수험서/자격증', id: 1383 },
	{ name: '어린이', id: 1108 },
	{ name: '에세이', id: 55889 },
	{ name: '여행', id: 1196 },
	{ name: '역사', id: 74 },
	{ name: '예술/대중문화', id: 517 },
	{ name: '외국어', id: 1322 },
	{ name: '요리/살림', id: 1230 },
	{ name: '유아', id: 13789 },
	{ name: '인문학', id: 656 },
	{ name: '자기계발', id: 336 },
	{ name: '잡지', id: 2913 },
	{ name: '장르소설', id: 112011 },
	{ name: '전집/중고전집', id: 17195 },
	{ name: '종교/역학', id: 1237 },
	{ name: '좋은부모', id: 2030 },
	{ name: '청소년', id: 1137 },
	{ name: '컴퓨터/모바일', id: 351 },
	{ name: '초등학교참고서', id: 50246 },
	{ name: '중학교참고서', id: 76000 },
	{ name: '고등학교참고서', id: 76001 },
];

// 	// 각 페이지(숫자) 선택 시 실행되는 함수(페이지네이션)
// 	const handlePageNumClick = (pageNum: number) => {
// 		// 현재 페이지 숫자와 선택하려는 페이지 숫자가 같으면 리턴
// 		if (currentPage === pageNum) return;
// 		// 현재 페이지 숫자 변경
// 		setCurrentPage(pageNum);
// 		// 페이지 선택시 페이지 상단으로 스크롤 이동
// 		window.scrollTo({ top: 300, behavior: 'smooth' });
// 	};
