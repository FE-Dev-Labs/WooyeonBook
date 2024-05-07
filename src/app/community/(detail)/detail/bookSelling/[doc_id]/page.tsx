import styles from '@/styles/community/detail/detailLayout.module.css';
import { fetchDetailCommunity } from '@/apis/community/CRUD';
import dynamic from 'next/dynamic';
import ScalatonUi from '@/components/common/ScalatonUi';

export default async function DetailPage({
	params,
	searchParams,
}: {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}) {
	const data = await fetchDetailCommunity('bookSelling', params.doc_id);
	const BookSellingLazy = dynamic(
		() => import('@/components/community/detail/BookSelling'),
		{ loading: () => <ScalatonUi wid="1300px" hei="100vh" bgc="black" /> },
	);
	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookSellingLazy
					data={data}
					params={params}
					searchParams={searchParams}
					page={'bookSelling'}
				/>
			</article>
			<aside className={styles.optionWrap}></aside>
		</main>
	);
}
