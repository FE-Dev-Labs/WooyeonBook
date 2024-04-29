import BookSelling from '@/components/community/detail/BookSelling';
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
	const data = await fetchDetailCommunity('bookSelling', params.doc_id);
	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookSelling data={data} searchParams={searchParams} />
			</article>
			<aside className={styles.optionWrap}>
				<StateBtn
					page={'bookSelling'}
					doc_id={params.doc_id}
					state={data.state as boolean}
					selling={data.selling as boolean}
					admin={data.created_user}
				/>
				<LikeBtn
					page={'bookSelling'}
					doc_id={params.doc_id}
					like={data.like_users}
				/>
				<button>공유</button>
			</aside>
		</main>
	);
}
