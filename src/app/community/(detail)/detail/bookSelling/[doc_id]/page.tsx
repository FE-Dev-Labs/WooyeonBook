import { AllDataType } from '@/types/community/view/data';
import BookSelling from '@/components/community/detail/BookSelling';
import styles from '@/styles/community/detail/DetailLayout.module.css';
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
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookSelling/${params.doc_id}`,
		{
			next: { revalidate: 60 },
		},
	);
	const data: AllDataType = await response.json();

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

export async function generateStaticParams() {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/bookSelling`,
	);
	const data: AllDataType[] = await res.json();
	const paths = data.map((item) => {
		return {
			doc_id: item.doc_id,
		};
	});
	return paths;
}
