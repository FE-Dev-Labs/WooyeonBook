import BookBuyingUpdate from '@/components/community/update/option/BookBuyingUpdate';

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const res = await fetch(
		`http://localhost:8080/api/community/bookBuying/${params.docId}`,
		{
			cache: 'no-store',
		},
	);
	const data = await res.json();

	return <BookBuyingUpdate data={data} docid={params.docId} />;
};

export default UpdatePage;
