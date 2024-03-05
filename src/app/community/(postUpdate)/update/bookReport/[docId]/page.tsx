import BookReportUpdate from '@/components/community/update/BookReportUpdate';

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
			cache: 'force-cache',
		},
	).then((res) => res.json());

	return (
		<div>
			<BookReportUpdate data={data[0]} docid={params.docId} />
		</div>
	);
};

export default UpdateBookReport;
