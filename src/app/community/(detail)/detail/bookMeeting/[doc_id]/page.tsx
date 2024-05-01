import BookMeeting from '@/components/community/detail/BookMeeting';
import styles from '@/styles/community/detail/detailLayout.module.css';
import LikeBtn from '@/components/community/detail/LikeBtn';
import StateBtn from '@/components/community/detail/StateBtn';
import { fetchDetailCommunity } from '@/apis/community/CRUD';

export default async function DetailPage({
	params,
	searchParams,
}: {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}) {
	const data = await fetchDetailCommunity('bookMeeting', params.doc_id);

	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookMeeting
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
