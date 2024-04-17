import { useState, useEffect } from 'react';
import { createClient } from '@/utils/supabase/client';

const useCurrentUser = (initialValue: string = '') => {
	const supabase = createClient();
	// 유저 이메일
	const [userEmail, setUserEmail] = useState<string | undefined>(initialValue);
	// 유저 이름
	const [userName, setUserName] = useState<string>(initialValue);
	// 유저 id
	const [userId, setUserId] = useState<string>(initialValue);
	// 유저 phone
	const [userPhone, setUserPhone] = useState<string>(initialValue);

	const getUser = async () => {
		const { data, error } = await supabase.auth.getUser();

		if (data.user) {
			// 사용자 이메일 접근
			setUserEmail(data.user.email);
			// 사용자 Id 접근
			setUserId(data.user.id);
			// 사용자 이름 접근
			setUserName(data.user?.user_metadata?.name);
			// 사용자 핸드폰 접근
			setUserPhone(data.user?.user_metadata?.phone);
		} else {
			console.log(error);
		}
	};

	useEffect(() => {
		getUser();
	}, []);

	return {
		userEmail,
		userName,
		userId,
		userPhone,
	};
};
export default useCurrentUser;
