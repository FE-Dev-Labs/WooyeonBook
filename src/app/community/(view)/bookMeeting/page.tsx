import ScalatonUi from '@/components/common/ScalatonUi';
import Pagination from '@/components/community/view/Pagination';
import { BookMeetingDataType } from '@/types/community/view/data';
import dynamic from 'next/dynamic';
function isBookMeetingArray(data: any): data is BookMeetingDataType[] {
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
				'recruitment_number' in item &&
				'deadline' in item &&
				'chatting_url' in item &&
				'like_users' in item,
		)
	);
}
const MeetingContentBoxLazy = dynamic(
	() => import('@/components/community/view/MeetingContentBox'),
	{ loading: () => <ScalatonUi wid="1000px" hei="158px" bgc="black" /> },
);
export default async function bookMeeting({
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
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/bookMeeting`,
		{
			cache: 'no-store',
		},
	);
	const data: BookMeetingDataType[] = await res.json();

	if (!isBookMeetingArray(data)) {
		throw new Error('Data is not an array of book meeting ');
	}

	const queryFiltering = searchParams?.q
		? data.filter((report: BookMeetingDataType) =>
				report.title.includes(searchParams.q as string),
			)
		: data;

	const categoryFiltering = queryFiltering.filter(
		(report: BookMeetingDataType) => {
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
		(a: BookMeetingDataType, b: BookMeetingDataType) => {
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
			{numFiltering?.map((data: BookMeetingDataType) => {
				return (
					<MeetingContentBoxLazy
						key={data.doc_id as string}
						data={data}
						page="bookMeeting"
					/>
				);
			})}
			<Pagination length={data.length} show_page_num={10} />
		</section>
	);
}
