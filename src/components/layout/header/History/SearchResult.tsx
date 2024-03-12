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

	// 입력한 keyword만 split하여 빈 값으로 넣어주는 로작
	const titleParts = data.title.split(String(keyword));

	// 검색어 리스트 클릭 함수
	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		const goToDetailUrl = `/detail/${data.isbn}?type=new`;
		router.push(goToDetailUrl);
		// 디테일 페이지로 넘어가면 검색창 닫아주기
		handleModalStateChange();
		// 로컬스토리지에 검색어 추가
		addKeyword(String(keyword));
	};

	return (
		<div
			className={styles.searchResultWrap}
			onMouseDown={(e) => handleMouseDown(e)}>
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
