import styles from '@/styles/search/searchView/seachVIew.module.css';
import { NewBookType } from '@/types/bookType';
import Pagination from '@/components/common/Pagination';
import SortBar from '@/components/common/SortBar';
import BookItemWrapper from '@/components/common/bookItem/BookItemWrapper';

interface SearchViewProps {
	keyword: string;
	data: NewBookType[];
	dataLength: number;
}

export default function SearchView({
	keyword,
	data,
	dataLength,
}: SearchViewProps) {
	return (
		<div className={styles.container}>
			{dataLength && (
				<main className={styles.wrapper}>
					<SortBar keyword={keyword} page="search" dataLength={dataLength} />
					<BookItemWrapper data={data} />
					<Pagination dataLength={dataLength} page="search" keyword={keyword} />
				</main>
			)}
			{!dataLength && (
				<div className={styles.noResult}>
					'{keyword}'에 대한 검색 결과를 찾을 수 없습니다. 🤔
				</div>
			)}
		</div>
	);
}
