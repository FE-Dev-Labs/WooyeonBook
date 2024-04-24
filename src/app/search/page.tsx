import styles from '@/styles/search/search.module.css';
import PageHeader from '@/components/common/PageHeader';
import SearchView from '@/components/search/searchView/SearchView';

export default async function searchPage({
	searchParams,
}: {
	searchParams: { keyword: any; pageNum: number };
}) {
	// search params - keyword
	const keyword = searchParams.keyword;
	// search params - page
	const pageNum = searchParams.pageNum;

	// search page data
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/list/search?query=${keyword}&pageNum=${pageNum}`,
	);
	const { data, dataLength } = await response.json();

	return (
		<div className={styles.container}>
			<PageHeader title={`'${keyword}' 검색 결과`} />
			<SearchView keyword={keyword} data={data} dataLength={dataLength} />
		</div>
	);
}
