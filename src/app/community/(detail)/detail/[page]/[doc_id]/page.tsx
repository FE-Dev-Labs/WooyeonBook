import { AllDataType } from '@/types/community/view/data';
import BookReport from '@/components/community/detail/BookReport';
import BookMeeting from '@/components/community/detail/BookMeeting';
import BookBuying from '@/components/community/detail/BookBuying';
import BookSelling from '@/components/community/detail/BookSelling';
import { getDate } from '@/utils/getDate';

export default async function DetailPage({
	params,
}: {
	params: { page: string; doc_id: string };
}) {
	const response = await fetch(
		`http://localhost:8080/community/${params.page}/${params.doc_id}`,
		{
			cache: 'no-store',
		},
	);
	const data: AllDataType = await response.json();

	switch (params.page) {
		case 'bookReport':
			return <BookReport data={data} />;
		case 'bookSelling':
			return <BookSelling data={data} />;
		case 'bookMeeting':
			return <BookMeeting data={data} />;
		case 'bookBuying':
			return <BookBuying data={data} />;
		default:
	}
}
