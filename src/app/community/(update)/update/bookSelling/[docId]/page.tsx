import BookSellingUpdate from '@/components/community/update/option/BookSellingUpdate';

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookSelling/${params.docId}`,
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
