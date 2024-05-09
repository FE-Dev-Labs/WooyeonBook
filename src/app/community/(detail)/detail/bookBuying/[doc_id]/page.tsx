import styles from '@/styles/community/detail/detailLayout.module.css';
import { fetchDetailCommunity } from '@/apis/community/CRUD';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { Metadata } from 'next';

interface BookBuyingDetailProps {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}

const BookBuyingLazy = dynamic(
	() => import('@/components/community/detail/BookBuying'),
	{ loading: () => <LoadingSpinner /> },
);

// export async function generateMetadata({
// 	params,
// }: BookBuyingDetailProps): Promise<Metadata> {
// 	const data = await fetchDetailCommunity('bookSelling', params.doc_id);

// 	return {
// 		title: `${data.title} | Wooyeon.`,
// 		description: `커뮤니티 - 나눔 '${data.title}' 글의 상세 페이지입니다.`,
// 	};
// }

export default async function DetailPage({
	params,
	searchParams,
}: BookBuyingDetailProps) {
	const data = await fetchDetailCommunity('bookBuying', params.doc_id);

	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookBuyingLazy
					data={data}
					params={params}
					searchParams={searchParams}
					page={'bookBuying'}
				/>
			</article>
			<aside className={styles.optionWrap}></aside>
		</main>
	);
}
