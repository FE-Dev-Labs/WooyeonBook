'use client';
import BookItemWrapper from '@/components/common/BookItemWrapper';
import CategoryBox from '@/components/common/CategoryBox';
import PageHeader from '@/components/common/PageHeader';
import Sort from '@/components/common/Sort';
import styles from '@/styles/search/search.module.css';
import { useSearchParams } from 'next/navigation';

export default function searchPage() {
	const params = useSearchParams();
	const keyword = params.get('keyword');

	// 검색어 데이터 이걸 사용해서 데이터 뿌리시오
	// useEffect(() => {}, [keyword]);
	return (
		<>
			<PageHeader title={`'${keyword}' 에 대한 검색 결과`} />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					{/* <CategoryBox /> */}
					<Sort page="search" />
					{/* <BookItemWrapper />
					<Pagination /> */}
				</div>
			</div>
		</>
	);
}
