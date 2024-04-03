import { AllDataType } from '@/types/community/view/data';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export const getDetailCommentData = async ({
	data,
	searchParams,
}: {
	data: AllDataType;
	searchParams?: { sort?: string };
}) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const response = supabase
		.from('comment')
		.select('*')
		.eq('doc_id', data.doc_id);

	switch (searchParams?.sort) {
		case 'like':
			response.order('like', { ascending: false });
		case 'lastest':
			response.order('created_at', { ascending: false });
		default:
			response.order('created_at', { ascending: false });
	}
	const { data: comments, error: commentError } = await response;
	if (commentError) {
		throw commentError;
	}
	return { comments };
};
