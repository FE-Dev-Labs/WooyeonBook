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
	searchParams: { sort?: string; q?: string };
}) {
	const { data, sortedData } = await getCommunityViewData({
		page: 'bookReport',
		searchParams,
	});

	if (!isBookReportArray(data)) {
		throw new Error('Data is not an array of book reports');
	}

	return (
		<section>
			{sortedData?.map((data: AllDataType) => {
				return <ContentBox key={data.doc_id} data={data} page="bookReport" />;
			})}
			<footer>
				<PageNation sortedData={sortedData} />
			</footer>
		</section>
	);
}

export default bookReport;
