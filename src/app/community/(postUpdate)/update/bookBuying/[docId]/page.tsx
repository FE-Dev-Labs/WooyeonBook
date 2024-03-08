import BookBuyingUpdate from '@/components/community/update/option/BookBuyingUpdate';

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`http://localhost:8080/api/community/bookBuying/${params.docId}`,
		{
			cache: 'force-cache',
		},
	).then((res) => res.json());

	return (
		<div>
			<BookBuyingUpdate data={data} docid={params.docId} />
		</div>
	);
};

export default UpdatePage;
