import styles from '@/styles/search/search.module.css';
import PageHeader from '@/components/common/PageHeader';
import SearchView from '@/components/search/searchView/SearchView';

export default function searchPage({
	searchParams,
}: {
	searchParams: { keyword: any };
}) {
	// keyword
	const keyword = searchParams.keyword;

	return (
		<div className={styles.container}>
			<PageHeader title={`'${keyword}' 검색 결과`} />
			<SearchView keyword={keyword} />
		</div>
	);
}
