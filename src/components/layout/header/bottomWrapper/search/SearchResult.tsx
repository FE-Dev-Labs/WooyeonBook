import { Book } from '@/types/bookDetailDate';
import styles from '@/styles/layout/header/bottomWrapper/search/searchResult.module.css';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRecoilState } from 'recoil';
import { searchKeyword } from '@/recoil/atom/searchKeyword';

interface searchResultProp {
	data: Book;
	handleModalStateChange: () => void;
}
export default function SearchResult({
	data,
	handleModalStateChange,
}: searchResultProp) {
	const [keyword, setKeyword] = useRecoilState(searchKeyword);

	// 검색어 로컬스토리지 저장
	const { addKeyword } = useLocalStorage('searchKeywords', []);

	const router = useRouter();

	// 입력한 키워드가 리스트에 있다면 빈값으로 만들어서 텍스트 색 다르게 주는 함수
	const titleParts = data.title.split(String(keyword));

	const keyonSubmit = async () => {
		const res = await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/supbase/popularSearch?keyword=${keyword}`,
		);
		const key = await res.json();
		const postdata = {
			keyword: keyword,
			search_count: 1,
			created_at: new Date(),
		};
		// 검색어에 대한 기록이 서버에 이미 존재하는지를 확인
		if (key.length > 0) {
			await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/update/supabase/keyword?keyword=${keyword}&count=${key[0].search_count}`,
				{
					method: 'PUT',
				},
			);
		} else {
			await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/search/create/supabase/keywords`,
				{
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify(postdata),
				},
			);
		}
	};
	// 검색어 리스트 클릭 함수
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		const goToDetailUrl = `/detail/${data.isbn}?type=new`;
		// 로컬스토리지에 검색어 추가
		addKeyword(String(keyword));
		keyonSubmit();
		// 검색 횟수 업데이트
		// 디테일 페이지로 넘어가면 검색창 닫아주기
		handleModalStateChange();
		router.push(goToDetailUrl);
	};

	return (
		<div className={styles.searchResultWrap} onMouseDown={handleMouseDown}>
			<ul className={styles.searchResultUl}>
				<li className={styles.searchResultLink}>
					<a className={styles.searchResultTitle}>
						{titleParts.map((word, index) => {
							return (
								<span key={index}>
									{index > 0 && (
										<strong className={styles.searchResultKeyword}>
											{String(keyword)}
										</strong>
									)}
									{word}
								</span>
							);
						})}
					</a>
				</li>
			</ul>
		</div>
	);
}
