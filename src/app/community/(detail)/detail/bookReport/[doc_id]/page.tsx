import BookReport from '@/components/community/detail/BookReport';
import styles from '@/styles/community/detail/detailLayout.module.css';
import { fetchDetailCommunity } from '@/apis/community/CRUD';

export default async function DetailPage({
	params,
	searchParams,
}: {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}) {
	const data = await fetchDetailCommunity('bookReport', params.doc_id);

	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookReport
					data={data}
					params={params}
					searchParams={searchParams}
					page={'bookReport'}
				/>
			</article>
			<aside className={styles.optionWrap}></aside>
		</main>
	);
}
