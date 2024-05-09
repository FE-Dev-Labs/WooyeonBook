import BookReportUpdate from '@/components/community/update/option/BookReportUpdate';
import { Metadata } from 'next';

const UpdateBookReport = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookReport/${params.docId}`,
		{
			cache: 'no-store',
		},
	).then((res) => res.json());

	return <BookReportUpdate data={data} docid={params.docId} />;
};

export default UpdateBookReport;
