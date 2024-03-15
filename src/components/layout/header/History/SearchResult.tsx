import { Book } from '@/types/bookDetailDate';
import styles from '@/styles/layout/header/history/searchResult.module.css';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';

interface searchResultProp {
	data: Book;
	keyword: string | number | Date;
	handleModalStateChange: () => void;
}
export default function SearchResult({
	data,
	keyword,
	handleModalStateChange,
}: searchResultProp) {
	// 검색어 로컬스토리지 저장
	const { addKeyword } = useLocalStorage('searchKeywords', []);

	const router = useRouter();

	// 입력한 키워드가 리스트에 있다면 빈값으로 만들어서 텍스트 색 다르게 주는 함수
	const titleParts = data.title.split(String(keyword));

	const onSubmit = async () => {
		const res = await fetch(
			`http://localhost:8080/supbase/popularSearch?keyword=${keyword}`,
		);
		const key = await res.json();
		console.log(key);
		const postdata = {
			keyword: keyword,
			search_count: 0,
			created_at: new Date(),
		};
		if (key.length > 0) {
			await fetch(
				`http://localhost:8080/api/updateKeywords?keyword=${keyword}&count=${key[0].search_count}`,
				{
					method: 'PUT',
				},
			);
		} else {
			await fetch(`http://localhost:8080/api/saveKeywords`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(postdata),
			});
		}
	};
	// 검색어 리스트 클릭 함수
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		const goToDetailUrl = `/detail/${data.isbn}?type=new`;
		// 로컬스토리지에 검색어 추가
		addKeyword(String(keyword));
		onSubmit();
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
