import { AllDataType } from '@/types/community/view/data';
import BookReport from '@/components/community/detail/BookReport';
import BookMeeting from '@/components/community/detail/BookMeeting';
import { getDate } from '@/utils/getDate';

export default async function DetailPage({
	params,
}: {
	params: { page: string; doc_id: string };
}) {
	const response = await fetch(
		`http://localhost:8080/community/${params.page}/${params.doc_id}`,
		{
			cache: 'force-cache',
		},
	);
	const data: AllDataType = await response.json();

	switch (params.page) {
		case 'bookReport':
			return <BookReport data={data} />;
		case 'bookSelling':
			return;
		case 'bookMeeting':
			return <BookMeeting data={data} />;
		case 'bookBuying':
			return;
		default:
	}
}
