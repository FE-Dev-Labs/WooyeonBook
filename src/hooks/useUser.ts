import {
	userEmailAtom,
	userIdAtom,
	userNameAtom,
	userPhoneAtom,
} from '@/recoil/atom/userAtom';
import { createClient } from '@/utils/supabase/client';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

export const useUser = () => {
	// supabase
	const supabase = createClient();
	// user id state
	const [userId, setUserId] = useRecoilState(userIdAtom);
	// user name state
	const [userName, setUserName] = useRecoilState(userNameAtom);
	// user email state
	const [userEmail, setUserEmail] = useRecoilState(userEmailAtom);
	// user phone state
	const [userPhone, setUserPhone] = useRecoilState(userPhoneAtom);

	// get user
	const getUser = async () => {
		try {
			const { data, error } = await supabase.auth.getUser();
			setUserId(data?.user?.id as string);
			setUserName(data.user?.user_metadata?.name);
			setUserEmail(data.user?.email);
			setUserPhone(data.user?.user_metadata?.phone);
			// error && console.log('사용자 정보를 가져오는 데 실패했습니다. :', error);
		} catch (error) {
			console.error('비동기 작업중 에러 발생: ', error);
		}
	};

	// getUser 뿌려줄 useEffect
	useEffect(() => {
		getUser();
	}, []);

	return { userId, userName, userEmail, userPhone };
};
