import styles from '@/styles/community/detail/detailLayout.module.css';
import { fetchDetailCommunity } from '@/apis/community/CRUD';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';
// import { Metadata } from 'next';

interface BookMeetingDetailProps {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}

const BookMeetingLazy = dynamic(
	() => import('@/components/community/detail/BookMeeting'),
	{ loading: () => <LoadingSpinner /> },
);

// export async function generateMetadata({
// 	params,
// }: BookMeetingDetailProps): Promise<Metadata> {
// 	const data = await fetchDetailCommunity('bookSelling', params.doc_id);

// 	return {
// 		title: `${data.title} | Wooyeon.`,
// 		description: `커뮤니티 - 모임 '${data.title}' 글의 상세 페이지입니다.`,
// 	};
// }

export default async function DetailPage({
	params,
	searchParams,
}: BookMeetingDetailProps) {
	const data = await fetchDetailCommunity('bookMeeting', params.doc_id);

	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookMeetingLazy
					data={data}
					params={params}
					searchParams={searchParams}
					page={'bookMeeting'}
				/>
			</article>
			<aside className={styles.optionWrap}></aside>
		</main>
	);
}
