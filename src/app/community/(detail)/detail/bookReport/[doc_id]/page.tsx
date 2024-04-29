import { AllDataType } from '@/types/community/view/data';
import BookReport from '@/components/community/detail/BookReport';
import styles from '@/styles/community/detail/detailLayout.module.css';
import LikeBtn from '@/components/community/detail/LikeBtn';
import StateBtn from '@/components/community/detail/StateBtn';

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
			<aside className={styles.optionWrap}>
				{/* <StateBtn
					page={'bookReport'}
					doc_id={params.doc_id}
					state={data.state as boolean}
					admin={data.created_user}
				/>
				<LikeBtn
					page={'bookReport'}
					doc_id={params.doc_id}
					like={data.like_users}
				/>
				<button>공유</button> */}
			</aside>
		</main>
	);
}