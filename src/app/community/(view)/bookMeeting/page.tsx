import ContentBox from '@/components/community/view/ContentBox';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { AllDataType } from '@/types/community/view/data';
export default async function meeting({
	searchParams,
}: {
	searchParams: { sort?: string; q?: string; categories?: string };
}) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const response = supabase.from('bookMeeting').select('*');

	const filterdBookMeetings = searchParams.q
		? response.ilike('title', `%${searchParams.q}%`)
		: response;

	switch (searchParams.sort) {
		case 'Latest':
			filterdBookMeetings.order('created_at', { ascending: false });
			break;
		case 'Oldest':
			filterdBookMeetings.order('created_at', { ascending: true });
			break;
		case 'View':
			filterdBookMeetings.order('view', { ascending: false });
			break;
		default:
			filterdBookMeetings.order('created_at', { ascending: false });
			break;
	}

	switch (searchParams.categories) {
		case 'true':
			filterdBookMeetings.eq('state', false);
			break;
		case 'false':
			filterdBookMeetings.eq('state', true);
			break;
		default:
			filterdBookMeetings;
			break;
	}
	const { data, error } = await filterdBookMeetings;

	if (error) {
		throw error;
	}
	return (
		<section>
			{data?.map((data: AllDataType, index) => {
				return <ContentBox key={index} data={data} page="bookMeeting" />;
			})}
		</section>
	);
}
