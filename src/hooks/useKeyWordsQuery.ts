import { searchKeyword } from '@/recoil/atom/searchKeyword';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useRecoilState } from 'recoil';
interface popularKeywords {
	id: string;
	keyword: string | number | Date;
	search_count: string;
	created_at: Date;
}
export default function useKeyWordsQuery() {
	// 검색어 리코일
	const [keyword, setKeyword] = useRecoilState(searchKeyword);

	const queryClient = useQueryClient();

	const getHotwordsData = useQuery<popularKeywords[]>({
		queryKey: ['oldHotWords'],
		queryFn: () =>
			fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/supabase/keywords`,
			).then((res) => res.json()),
		refetchOnWindowFocus: false,
	});

	// 검색어 sever에서 확인하는 로직
	const keyonSubmitData = useMutation({
		// 인기 검색어 데이터
		mutationFn: async (newHotWords) => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/supabase/popularSearch?keyword=${keyword}`,
				{
					method: 'GET',
					body: JSON.stringify(newHotWords),
					headers: { 'Content-Type': 'application/json; charset=UTF-8' },
				},
			);
			if (!response.ok) {
				throw new Error('Failed to fetch new hot words');
			}

			//데이터 변환
			const key = await response.json();

			// 데이터 추가
			const postdata = {
				keyword: keyword,
				search_count: 1,
				created_at: new Date(),
			};

			// 검색어가 대한 기록이 서버에 이미 존재하는지 확인
			if (key.length > 0) {
				await fetch(
					`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/update/supabase/keyword?keyword=${keyword}&count=${key[0].search_count}`,
					{
						method: 'PUT',
						body: JSON.stringify({ search_count: key[0].search_count + 1 }),
						headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					},
				);
			} else {
				// 검색어 기록이 서버에 없으면 검색어 추가
				await fetch(
					`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/create/supabase/keywords`,
					{
						method: 'POST',
						body: JSON.stringify(postdata),
						headers: { 'Content-Type': 'application/json; charset=UTF-8' },
					},
				);
			}
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['oldHotWords'] });
		},
	});

	return { getHotwordsData, keyonSubmitData };
}
