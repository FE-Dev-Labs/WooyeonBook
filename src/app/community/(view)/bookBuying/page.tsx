import Pagination from '@/components/community/view/Pagination';
import { BookBuyingDataType } from '@/types/community/view/data';
import dynamic from 'next/dynamic';
import BookContentSkeletonUi from '@/components/common/BookContentSkeletonUi';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '커뮤니티 - 삽니다 | Wooyeon.',
	description: '커뮤니티 - 삽니다 페이지입니다.',
};

function isBookBuyingArray(data: any): data is BookBuyingDataType[] {
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
				'field' in item &&
				'content_img_url' in item &&
				'state' in item &&
				'book_name' in item &&
				'book_img_url' in item &&
				'category' in item &&
				'price' in item &&
				'book_id' in item &&
				'like_users' in item,
		)
	);
}
const BuyingContentBoxLazy = dynamic(
	() => import('@/components/community/view/BuyingContentBox'),
	{ loading: () => <BookContentSkeletonUi /> },
);
export default async function bookBuying({
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
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/bookBuying`,
		{
			cache: 'no-store',
		},
	);
	const data: BookBuyingDataType[] = await res.json();

	if (!isBookBuyingArray(data)) {
		throw new Error('Data is not an array of book buying ');
	}
	const queryFiltering = searchParams?.q
		? data.filter((report: BookBuyingDataType) =>
				report.title.includes(searchParams.q as string),
			)
		: data;
	const categoryFiltering = queryFiltering.filter(
		(report: BookBuyingDataType) => {
			switch (searchParams?.categories) {
				case 'true':
					return report.state === false;
				case 'false':
					return report.state === true;
				default:
					return report;
			}
		},
	);
	const sortFiltering = categoryFiltering.sort(
		(a: BookBuyingDataType, b: BookBuyingDataType) => {
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
			{numFiltering?.map((data: BookBuyingDataType) => {
				return (
					<BuyingContentBoxLazy
						key={data.doc_id as string}
						data={data}
						page="bookBuying"
					/>
				);
			})}
			<Pagination length={data.length} show_page_num={10} />
		</section>
	);
}
