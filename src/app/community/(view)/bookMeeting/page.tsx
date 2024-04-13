import ContentBox from '@/components/community/view/ContentBox';
import { AllDataType, BookMeetingDataType } from '@/types/community/view/data';
import PageNation from '@/components/community/view/PageNation';
import { getCommunityViewData } from '@/apis/community/getCommunityViewData';
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
export default async function meeting({
	searchParams,
}: {
	searchParams: { sort?: string; q?: string; categories?: string };
}) {
	const { data, sortedData } = await getCommunityViewData({
		page: 'bookBuying',
		searchParams,
	});

	if (!isBookMeetingArray(data)) {
		throw new Error('Data is not an array of book buying ');
	}
	const res = await fetch('http://localhost:8080/community/bookMeeting', {
		cache: 'no-store',
	});
	const alldata: AllDataType[] = await res.json();
	return (
		<section>
			{sortedData?.map((data: AllDataType, index) => {
				return <ContentBox key={data.doc_id} data={data} page="bookMeeting" />;
			})}
			<PageNation alldata={alldata} />
		</section>
	);
}
