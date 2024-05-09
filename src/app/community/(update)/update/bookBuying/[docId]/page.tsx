import BookBuyingUpdate from '@/components/community/update/option/BookBuyingUpdate';
import { Metadata } from 'next';

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const res = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookBuying/${params.docId}`,
		{
			cache: 'no-store',
		},
	);
	const data = await res.json();

	return <BookBuyingUpdate data={data} docid={params.docId} />;
};

export default UpdatePage;
