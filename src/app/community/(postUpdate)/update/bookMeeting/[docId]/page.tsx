import BookMeetingUpdate from '@/components/community/update/option/BookMeetingUpdate';

const UpdateBookMeeting = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`http://localhost:8080/api/community/bookMeeting/${params.docId}`,
		{
			cache: 'no-store',
		},
	).then((res) => res.json());

	return (
		<div>
			<BookMeetingUpdate data={data} docid={params.docId} />
		</div>
	);
};

export default UpdateBookMeeting;
