import ContentBox from '@/components/community/view/ContentBox';
import { AllDataType, BookBuyingDataType } from '@/types/community/view/data';
import { getCommunityViewData } from '@/apis/community/getCommunityViewData';
import PageNation from '@/components/community/view/PageNation';

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
export default async function bookBuying({
	searchParams,
}: {
	searchParams: { sort?: string; q?: string };
}) {
	const { sortedData } = await getCommunityViewData({
		page: 'bookBuying',
		searchParams,
	});

	if (!isBookBuyingArray(sortedData)) {
		throw new Error('Data is not an array of book buying ');
	}
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/bookBuying`,
		{
			cache: 'no-store',
		},
	);
	const alldata: AllDataType[] = await res.json();

	return (
		<section>
			{sortedData?.map((data: AllDataType) => {
				return <ContentBox key={data.doc_id} data={data} page="bookBuying" />;
			})}
			<PageNation alldata={alldata} />
		</section>
	);
}
