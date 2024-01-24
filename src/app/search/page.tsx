import BookItemWrapper from '@/components/common/BookItemWrapper';
import Category from '@/components/common/Category';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
import styles from '@/styles/search/search.module.css';

interface searchPageProps {
	keyword: string;
}

export default function searchPage({ keyword }: searchPageProps) {
	return (
		<>
			<PageHeader title={`'${keyword}' 에 대한 검색 결과`} />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<Category />
					<Sort />
					<BookItemWrapper />
					<Pagination />
				</div>
			</div>
		</>
	);
}
