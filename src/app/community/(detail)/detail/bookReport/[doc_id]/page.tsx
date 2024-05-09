import styles from '@/styles/community/detail/detailLayout.module.css';
import { fetchDetailCommunity } from '@/apis/community/CRUD';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { Metadata } from 'next';

interface BookReportDetailProps {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}

const BookReportLazy = dynamic(
	() => import('@/components/community/detail/BookReport'),
	{ loading: () => <LoadingSpinner /> },
);

// community - detail - bookreport 서버컴포넌트인데 metedata 추가시 에러발생
// export async function generateMetadata({
// 	params,
// }: BookReportDetailProps): Promise<Metadata> {
// 	const data = await fetchDetailCommunity('bookSelling', params.doc_id);

// 	return {
// 		title: `${data.title} | Wooyeon.`,
// 		description: `커뮤니티 - 독후감 '${data.title}' 글의 상세 페이지입니다.`,
// 	};
// }

export default async function DetailPage({
	params,
	searchParams,
}: BookReportDetailProps) {
	const data = await fetchDetailCommunity('bookReport', params.doc_id);

	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookReportLazy
					data={data}
					params={params}
					searchParams={searchParams}
					page="bookReport"
				/>
			</article>
			<aside className={styles.optionWrap}></aside>
		</main>
	);
}
