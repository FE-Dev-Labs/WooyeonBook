import { getUser } from '@/apis/community/getUser';
import { useEffect, useState } from 'react';

export const useUser = () => {
	// 유저 state
	const [user, setUser] = useState<string | null>(null);

	// getUser api에서 user_id와 error를 뿌려줄 useEffect
	useEffect(() => {
		const fetchUser = async () => {
			try {
				const { user_id } = await getUser();
				setUser(user_id as string);
			} catch (error) {
				setUser(null);
			}
		};
		fetchUser();
	}, []);

	return user;
};
