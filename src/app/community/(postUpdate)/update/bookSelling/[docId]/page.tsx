import BookSellingUpdate from '@/components/community/update/option/BookSellingUpdate';

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`http://localhost:8080/api/community/bookSelling/${params.docId}`,
		{
			cache: 'no-store',
		},
	).then((res) => res.json());

	return (
		<div>
			<BookSellingUpdate data={data} docid={params.docId} />
		</div>
	);
};

export default UpdatePage;
