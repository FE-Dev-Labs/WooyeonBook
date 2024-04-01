import { createClient } from '@/utils/supabase/client';

export const getUser = async () => {
	const supabase = createClient();
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) {
		throw error;
	}
	const user_id = user?.id;
	const user_email = user?.email;
	const user_name = user?.user_metadata.name;

	return { user_id, user_email, user_name, error };
};
