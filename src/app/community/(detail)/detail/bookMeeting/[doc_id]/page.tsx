import styles from '@/styles/community/detail/detailLayout.module.css';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';

const BookMeetingLazy = dynamic(
	() => import('@/components/community/detail/BookMeeting'),
	{ loading: () => <LoadingSpinner /> },
);
async function fetchData(page: string, doc_id: string) {
	let retryCount = 0;
	const maxRetries = 3;

	while (retryCount < maxRetries) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/${page}/${doc_id}`,
				{
					cache: 'no-store',
				},
			);
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				throw new Error(
					`Fetch request failed with status code ${response.status}`,
				);
			}
		} catch (error) {
			console.error(
				`Fetch request failed. Retrying... (Attempt ${retryCount + 1}/${maxRetries})`,
				error,
			);
			retryCount++;
			await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기 후 재시도
		}
	}

	throw new Error('Maximum number of retries reached. Unable to fetch data.');
}
export default async function DetailPage({
	params,
	searchParams,
}: {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}) {
	const data = await fetchData('bookMeeting', params.doc_id);
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
