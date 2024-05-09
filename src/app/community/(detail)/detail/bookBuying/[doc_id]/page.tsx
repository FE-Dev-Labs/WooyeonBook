import styles from '@/styles/community/detail/detailLayout.module.css';
import dynamic from 'next/dynamic';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { BookBuyingDataType } from '@/types/community/view/data';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

interface BookBuyingDetailProp {
	params: { doc_id: string };
	searchParams?: { sort?: string };
}

export async function generateMetadata({
	params,
}: BookBuyingDetailProp): Promise<Metadata> {
	const data = await fetchData('bookSelling', params.doc_id);

	return {
		title: `${data.title} | Wooyeon.`,
		description: `커뮤니티 - ${data.title} 디테일 페이지입니다.`,
	};
}

const BookBuyingLazy = dynamic(
	() => import('@/components/community/detail/BookBuying'),
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
					next: { revalidate: 1 },
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

	redirect('/error');
}
export const dynamicParams = true;
export async function generateStaticParams() {
	const datas = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/bookBuying`,
	).then((res) => res.json());

	return datas.map((data: BookBuyingDataType) => {
		return {
			doc_id: data.doc_id,
		};
	});
}
export default async function DetailPage({
	params,
	searchParams,
}: BookBuyingDetailProp) {
	const data = await fetchData('bookBuying', params.doc_id);
	return (
		<main className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>
				<BookBuyingLazy
					data={data}
					params={params}
					searchParams={searchParams}
					page={'bookBuying'}
				/>
			</article>
			<aside className={styles.optionWrap}></aside>
		</main>
	);
}
