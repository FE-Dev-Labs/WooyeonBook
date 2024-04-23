import styles from '@/styles/search/search.module.css';
import PageHeader from '@/components/common/PageHeader';
import SearchView from '@/components/search/searchView/SearchView';

export default async function searchPage({
	searchParams,
}: {
	searchParams: { keyword: any; sortType: string };
}) {
	// search params - keyword
	const keyword = searchParams.keyword;
	// search params - sort type
	const sortType = searchParams.sortType;

	// search page data
	const response = await fetch(
		`http://localhost:8080/list/search?query=${keyword}&sortType=${sortType}`,
		{ next: { revalidate: 3600 } },
	);
	const { data } = await response.json();

	return (
		<div className={styles.container}>
			<PageHeader title={`'${keyword}' 검색 결과`} />
			<SearchView keyword={keyword} data={data} />
		</div>
	);
}
