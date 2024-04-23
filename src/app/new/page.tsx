import styles from '@/styles/new/new.module.css';
import PageHeader from '@/components/common/PageHeader';
import NewView from '@/components/new/newView/NewView';

export default async function newPage({
	searchParams,
}: {
	searchParams: { categoryId: string; pageNum: number };
}) {
	// search params - category id
	const categoryId = searchParams.categoryId;
	// search params - page
	const pageNum = searchParams.pageNum;

	// new page data
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/list/newSpecialAll?categoryId=${categoryId}&pageNum=${pageNum}`,
		{ next: { revalidate: 3600 } },
	);
	const { data, dataLength } = await response.json();

	return (
		<div className={styles.container}>
			<PageHeader title="신간도서" />
			<NewView categoryId={categoryId} data={data} dataLength={dataLength} />
		</div>
	);
}
