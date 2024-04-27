import { AllDataType } from '@/types/community/view/data';
import BookReport from '@/components/community/detail/BookReport';
import styles from '@/styles/community/detail/detailLayout.module.css';

export default async function DetailPage({
	params,
	searchParams,
}: {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}) {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookReport/${params.doc_id}`,
		{
			cache: 'no-store',
		},
	);
	const data: AllDataType = await response.json();

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
