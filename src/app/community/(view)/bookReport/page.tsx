import ContentBox from '@/components/community/view/ContentBox';
import { cookies, headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

async function BookReport() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const { data } = await supabase.from('bookReport').select('*');

	return (
		<div>
			{data?.map((data, index) => {
				return <ContentBox key={index} />;
			})}
		</div>
	);
}

export default BookReport;
