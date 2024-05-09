import BookMeetingUpdate from '@/components/community/update/option/BookMeetingUpdate';
import { Metadata } from 'next';

const UpdateBookMeeting = async ({
	params,
}: {
	params: {
		docId: string;
	};
}) => {
	const data = await fetch(
		`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/detail/bookMeeting/${params.docId}`,
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
