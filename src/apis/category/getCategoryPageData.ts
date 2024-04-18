import { NewBookType, RootBookType } from '@/types/bookType';

export const getCategoryPageData = async (
	categoryId: string | null,
	sortType: string,
) => {
	try {
		// 첫 페이지 데이터 요청
		const response = await fetch(
			`${process.env.NEXT_PUBLIC_BASE_URL}?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewAll&MaxResults=24&start=1&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
			{ next: { revalidate: 3600 } },
		);
		// 네트워크 응답 상태가 성공적이지 않은 경우
		if (!response.ok) {
			throw new Error(`Network response was not ok: ${response.statusText}`);
		}

		// json 변환
		const data: RootBookType = await response.json();
		// item 속성만 추출
		const categoryData = data.item as NewBookType[];
		// 해당 카테고리의 모든 데이터를 넣어줄 배열 (+ 첫 요청에서 가져온 24개 아이템)
		const allCategoryData = [...categoryData];
		// 해당 카테고리의 모든 아이템 갯수
		const allCategoryDataLength = data.totalResults;
		// 해당 카테고리의 페이지 수(페이지네이션)
		const pageLength = Math.ceil(allCategoryDataLength / 24);

		// 두 번째 페이지부터 마지막 페이지까지 데이터 요청 및 누적
		for (let start = 2; start <= pageLength; start++) {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_BASE_URL}?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewAll&MaxResults=24&start=${start}&SearchTarget=Book&CategoryId=${categoryId}&output=js&Version=20131101&Cover=Big`,
				{ next: { revalidate: 3600 } },
			);
			// 네트워크 응답 상태가 성공적이지 않은 경우
			if (!response.ok) {
				throw new Error(`Network response was not ok: ${response.statusText}`);
			}

			// for문을 돌며 얻은 데이터
			const data = await response.json();
			// item 속성만 추출
			const categoryData = data.item as NewBookType[];
			// allCategoryData에 push
			allCategoryData.push(...categoryData);
		}

		// 해당 카테고리의 모든 데이터 정렬
		const sortedAllCategoryData =
			sortType === 'title'
				? allCategoryData.sort((a, b) => a.title.localeCompare(b.title))
				: allCategoryData.sort(
						(a, b) =>
							new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
					);

		return sortedAllCategoryData;
	} catch (error) {
		console.error('Fetch error:', error);
		throw error;
	}
};
