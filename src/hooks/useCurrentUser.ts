import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

const useCurrentUser = (initialValue: string = '') => {
	const supabase = createClient();
	// 유저 이름
	const [useName, setUseName] = useState<string>(initialValue);
	// 유저 id
	const [userId, setUserId] = useState<string>(initialValue);

	const getUser = async () => {
		const { data, error } = await supabase.auth.getUser();

		if (data.user) {
			// 사용자 Id 접근
			setUserId(data.user.id);
			// 사용자 이름 접근
			setUseName(data.user?.user_metadata?.name);
		} else {
			console.log(error);
		}
	};

	return {
		useName,
		userId,
		getUser,
	};
};
export default useCurrentUser;
