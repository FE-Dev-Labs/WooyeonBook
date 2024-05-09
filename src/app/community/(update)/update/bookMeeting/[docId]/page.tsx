import BookMeetingUpdate from '@/components/community/update/option/BookMeetingUpdate';
async function fetchData(docId: string) {
	let retryCount = 0;
	const maxRetries = 3;

	while (retryCount < maxRetries) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookMeeting/${docId}`,
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
const UpdateBookMeeting = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetchData(params.docId);

	return (
		<div>
			<BookMeetingUpdate data={data} docid={params.docId} />
		</div>
	);
};

export default UpdateBookMeeting;
