import styles from '@/styles/community/detail/detailLayout.module.css';
import { fetchDetailCommunity } from '@/apis/community/CRUD';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { Metadata } from 'next';

interface BookSellingDetailProps {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}

const BookSellingLazy = dynamic(
	() => import('@/components/community/detail/BookSelling'),
	{ loading: () => <LoadingSpinner /> },
);

export async function generateMetadata({
	params,
}: BookSellingDetailProps): Promise<Metadata> {
	const data = await fetchDetailCommunity('bookSelling', params.doc_id);

	return {
		title: `${data.title} | Wooyeon.`,
		description: `커뮤니티 - 나눔 '${data.title}' 글의 상세 페이지입니다.`,
	};
}

export default async function DetailPage({
	params,
	searchParams,
}: BookSellingDetailProps) {
	const data = await fetchDetailCommunity('bookSelling', params.doc_id);

	console.log(data.title);

	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookSellingLazy
					data={data}
					params={params}
					searchParams={searchParams}
					page={'bookSelling'}
				/>
			</article>
			<aside className={styles.optionWrap}></aside>
		</main>
	);
}
