import Pagination from '@/components/community/view/Pagination';
import { BookSellingDataType } from '@/types/community/view/data';
import dynamic from 'next/dynamic';

function isBookSellingArray(data: any): data is BookSellingDataType[] {
	return (
		Array.isArray(data) &&
		data.every(
			(item) =>
				typeof item === 'object' &&
				'title' in item &&
				'created_at' in item &&
				'view' in item &&
				'like' in item &&
				'user_name' in item &&
				'content' in item &&
				'book_name' in item &&
				'book_img_url' in item &&
				'category' in item &&
				'content_img_url' in item &&
				'doc_id' in item &&
				'field' in item &&
				'book_id' in item &&
				'created_user' in item &&
				'price' in item &&
				'state' in item &&
				'selling' in item,
		)
	);
}
const SellingContentBoxLazy = dynamic(
	() => import('@/components/community/view/SellingContentBox'),
	{ loading: () => <p>Loading...</p> },
);

export default async function bookSelling({
	searchParams,
}: {
	searchParams: {
		sort?: string;
		q?: string;
		num?: string;
		categories?: string;
	};
}) {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/bookSelling`,
		{
			cache: 'no-store',
		},
	);

	const data: BookSellingDataType[] = await res.json();

	if (!isBookSellingArray(data)) {
		throw new Error('Data is not an array of book selling data');
	}
	const queryFiltering = searchParams?.q
		? data.filter((report: BookSellingDataType) =>
				report.title.includes(searchParams.q as string),
			)
		: data;

	const categoryFiltering = queryFiltering.filter(
		(report: BookSellingDataType) => {
			switch (searchParams?.categories) {
				case 'true':
					return report.selling === false;
				case 'false':
					return report.selling === true;
				default:
					return report;
			}
		},
	);
	const sortFiltering = categoryFiltering.sort(
		(a: BookSellingDataType, b: BookSellingDataType) => {
			switch (searchParams?.sort) {
				case 'Latest':
					return b.created_at > a.created_at ? 1 : -1;
				case 'Oldest':
					return a.created_at > b.created_at ? 1 : -1;
				case 'View':
					return b.view - a.view;
				default:
					return b.created_at > a.created_at ? 1 : -1;
			}
		},
	);

	const num = searchParams?.num ? parseInt(searchParams.num) : 1;

	const start = num * 10 - 10;
	const end = num * 10 - 1;

	const numFiltering = sortFiltering.slice(start, end);
	return (
		<section>
			{numFiltering?.map((data: BookSellingDataType) => {
				return (
					<SellingContentBoxLazy
						key={data.doc_id as string}
						data={data}
						page="bookSelling"
					/>
				);
			})}
			<Pagination length={data.length} show_page_num={10} />
		</section>
	);
}
