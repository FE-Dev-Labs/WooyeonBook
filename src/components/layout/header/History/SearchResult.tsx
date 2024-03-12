import { Book } from '@/types/bookDetailDate';
import styles from '@/styles/layout/header/history/searchResult.module.css';
import { useRouter } from 'next/navigation';
import useModal from '@/hooks/useModal';

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
	const router = useRouter();

	const titleParts = data.title.split(String(keyword));

	const handleMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		e.preventDefault();
		const goToDetailUrl = `/detail/${data.isbn}?type=new`;
		router.push(goToDetailUrl);
		// 디테일 페이지로 넘어가면 검색창 닫아주기
		// setOpenSearchResult(false);

		handleModalStateChange();
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
