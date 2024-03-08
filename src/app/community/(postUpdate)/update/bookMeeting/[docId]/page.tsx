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
			cache: 'force-cache',
		},
	).then((res) => res.json());

	console.log(data);

	return (
		<div>
			<BookMeetingUpdate data={data} docid={params.docId} />
		</div>
	);
};

export default UpdateBookMeeting;
