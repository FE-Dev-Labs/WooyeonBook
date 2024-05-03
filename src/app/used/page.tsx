import styles from '@/styles/used/used.module.css';
import PageHeader from '@/components/common/PageHeader';
import UsedView from '@/components/used/usedView/UsedView';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '중고 도서 | Wooyeon.',
	description: '지구를 위해 중고도서 어떠세요?',
};

export default async function usedPage({
	searchParams,
}: {
	searchParams: { categoryId: string; pageNum: number };
}) {
	// search params - category id
	const categoryId = searchParams.categoryId;
	// search params - page
	const pageNum = searchParams.pageNum;

	// used page data
	const usedBestResponse = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/list/usedBest`,
		{ next: { revalidate: 86400 } },
	);
	const { usedBestData } = await usedBestResponse.json();
	const usedResponse = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/list/usedAll?categoryId=${categoryId}&pageNum=${pageNum}`,
		{ next: { revalidate: 86400 } },
	);
	const { data, dataLength } = await usedResponse.json();

	return (
		<div className={styles.container}>
			<PageHeader title="중고도서" />
			<UsedView
				categoryId={categoryId}
				data={data}
				dataLength={dataLength}
				usedBestData={usedBestData}
			/>
		</div>
	);
}
