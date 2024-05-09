import { Book } from '@/types/bookDetailDate';
import styles from '@/styles/layout/header/bottomWrapper/search/searchResult.module.css';
import { useRouter } from 'next/navigation';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { useRecoilState } from 'recoil';
import { searchKeyword } from '@/recoil/atom/searchKeyword';

interface searchResultProp {
	data: Book;
	handleModalStateChange: () => void;
	keyonSubmit: any;
}
export default function SearchResult({
	data,
	handleModalStateChange,
	keyonSubmit,
}: searchResultProp) {
	const router = useRouter();

	const [keyword, setKeyword] = useRecoilState(searchKeyword);

	// 검색어 로컬스토리지 저장
	const { addKeyword } = useLocalStorage('searchKeywords', []);

	// 입력한 키워드가 리스트에 있다면 빈값으로 만들어서 텍스트 색 다르게 주는 함수
	const titleParts = data.title.split(String(keyword));

	// 검색어 리스트 클릭 함수
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		const goToDetailUrl = `/detail/${data.isbn}?type=new`;
		// 로컬스토리지에 검색어 추가
		addKeyword(String(keyword));
		keyonSubmit.mutate();
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
