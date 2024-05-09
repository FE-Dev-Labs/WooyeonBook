import BookBuyingUpdate from '@/components/community/update/option/BookBuyingUpdate';
import { Metadata } from 'next';

// const getData = async (docId: string) => {
// 	const res = await fetch(
// 		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookBuying/${docId}`,
// 		{
// 			cache: 'no-store',
// 		},
// 	);
// 	if (!res.ok) {
// 		throw new Error('Failed to fetch data');
// 	}
// 	const data = await res.json();
// 	return data;

// };
async function fetchData(docId: string) {
	let retryCount = 0;
	const maxRetries = 3;

	while (retryCount < maxRetries) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookBuying/${docId}`,
				{
					cache: 'no-store',
				},
			);
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				throw new Error(
					`Fetch request failed with status code ${response.status}`,
				);
			}
		} catch (error) {
			console.error(
				`Fetch request failed. Retrying... (Attempt ${retryCount + 1}/${maxRetries})`,
				error,
			);
			retryCount++;
			await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기 후 재시도
		}
	}

	throw new Error('Maximum number of retries reached. Unable to fetch data.');
}

const UpdatePage = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetchData(params.docId);

	return <BookBuyingUpdate data={data} docid={params.docId} />;
};

export default UpdatePage;
