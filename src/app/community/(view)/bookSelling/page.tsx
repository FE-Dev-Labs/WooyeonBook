import { getCommunityViewData } from '@/apis/community/getCommunityViewData';
import ContentBox from '@/components/community/view/ContentBox';
import { AllDataType, BookSellingDataType } from '@/types/community/view/data';

function isBookMeetingArray(data: any): data is BookSellingDataType[] {
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

export default async function sellingBook({
	searchParams,
}: {
	searchParams: { sort?: string; q?: string };
}) {
	const { data, filteringData } = await getCommunityViewData({
		page: 'bookSelling',
		searchParams,
	});

	if (!isBookMeetingArray(data)) {
		throw new Error('Data is not an array of book buying ');
	}
	return (
		<section>
			{filteringData?.map((data: AllDataType) => {
				return <ContentBox key={data.doc_id} data={data} page="bookSelling" />;
			})}
		</section>
	);
}
