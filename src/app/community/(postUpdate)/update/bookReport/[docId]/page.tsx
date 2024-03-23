import BookReportUpdate from '@/components/community/update/option/BookReportUpdate';

const UpdateBookReport = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`http://localhost:8080/api/community/bookReport/${params.docId}`,
		{
			cache: 'no-store',
		},
	).then((res) => res.json());

	return (
		<div>
			<BookReportUpdate data={data} docid={params.docId} />
		</div>
	);
};

export default UpdateBookReport;
