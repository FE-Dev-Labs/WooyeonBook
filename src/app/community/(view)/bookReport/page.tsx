import { getCommunityViewData } from '@/apis/community/getCommunityViewData';
import ContentBox from '@/components/community/view/ContentBox';
import PageNation from '@/components/community/view/PageNation';
import { AllDataType, BookReportDataType } from '@/types/community/view/data';

function isBookReportArray(data: any): data is BookReportDataType[] {
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
				'created_user' in item,
		)
	);
}

async function bookReport({
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
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/bookReport`,
		{
			cache: 'no-store',
		},
	);

	const data: BookReportDataType[] = await res.json();

	if (!isBookReportArray(data)) {
		throw new Error('Data is not an array of book reports');
	}

	const queryFiltering = searchParams?.q
		? data.filter((report: BookReportDataType) =>
				report.title.includes(searchParams.q as string),
			)
		: data;

	// const categoryFiltering = queryFiltering.filter((report: BookReportDataType) => {
	// 	switch (searchParams?.categories) {
	// 		case 'true':
	// 			return report.state === false;
	// 		case 'false':
	// 			return report.state === true;
	// 		default:
	// 			return report;
	// 	}
	// });
	const sortFiltering = queryFiltering.sort(
		(a: BookReportDataType, b: BookReportDataType) => {
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
			{numFiltering?.map((data: AllDataType) => {
				return <ContentBox key={data.doc_id} data={data} page="bookReport" />;
			})}
			<PageNation alldata={data} />
		</section>
	);
}

export default bookReport;
