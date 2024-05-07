import styles from '@/styles/search/search.module.css';
import PageHeader from '@/components/common/PageHeader';
import SearchView from '@/components/search/searchView/SearchView';
import { Metadata } from 'next';

interface SearchPageProp {
	searchParams: { keyword: any; pageNum: number };
}
export async function generateMetadata({
	searchParams,
}: SearchPageProp): Promise<Metadata> {
	const keyword = searchParams.keyword;
	return {
		title: keyword
			? `'${keyword}' 검색 결과 | Wooyeon.`
			: '작가명 또는 책 제목을 입력하세요. | Wooyeon.',
		description: '검색 결과 페이지입니다.',
	};
}

export default async function searchPage({ searchParams }: SearchPageProp) {
	// search params - keyword
	const keyword = searchParams.keyword;
	// search params - page
	const pageNum = searchParams.pageNum;

	// search page data
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/list/search?query=${keyword}&pageNum=${pageNum}`,
		{ next: { revalidate: 86400 } },
	);
	const { data, dataLength } = await response.json();

	return (
		<div className={styles.container}>
			<PageHeader title={`'${keyword}' 검색 결과`} />
			<SearchView keyword={keyword} data={data} dataLength={dataLength} />
		</div>
	);
}

// interface SearchPageProps {
// 	params: { id: string };
// 	searchParams: { [key: string]: string | string[] | undefined };
// }
// export async function generateMetadata({
// 	searchParams,
// }: SearchPageProps): Promise<Metadata> {
// 	const keyword = searchParams.keyword;
// 	return {
// 		title: keyword
// 			? `'${keyword}' 검색 결과 | Wooyeon.`
// 			: '작가명 또는 책 제목을 입력하세요. | Wooyeon.',
// 		description: '검색 결과 페이지입니다.',
// 	};
// }

// const searchPage = async ({
// 	searchParams,
// }: {
// 	searchParams: { keyword: string; pageNum: number };
// }) => {
// 	// search params - keyword
// 	const keyword = searchParams.keyword;
// 	// search params - page
// 	const pageNum = searchParams.pageNum;

// 	// search page data
// 	const response = await fetch(
// 		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/list/search?query=${keyword}&pageNum=${pageNum}`,
// 		{ next: { revalidate: 86400 } },
// 	);
// 	const { data, dataLength } = await response.json();

// 	return (
// 		<div className={styles.container}>
// 			<PageHeader title={`'${keyword}' 검색 결과`} />
// 			<SearchView keyword={keyword} data={data} dataLength={dataLength} />
// 		</div>
// 	);
// };

// export default searchPage;
