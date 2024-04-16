import { getUser } from '@/apis/community/getUser';
import { useEffect, useState } from 'react';

// order button 변경 후 isLoggedIn boolean으로 수정하기

export const useIsLoggedIn = () => {
	// 유저 state
	const [isLoggedIn, setIsLoggedIn] = useState<string | null>(null);
	// 유저 name state
	const [userName, setUserName] = useState<string | null>(null);

	// getUser api에서 user_id와 error를 뿌려줄 useEffect
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { user_id, user_name } = await getUser();
				setIsLoggedIn(user_id as string);
				setUserName(user_name);
			} catch (error) {
				setIsLoggedIn(null);
			}
		};
		fetchUser();
	}, []);

	return { isLoggedIn, userName };
};
