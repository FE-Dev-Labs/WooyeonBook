'use client';

import Image from 'next/image';
import Link from 'next/link';
import verticalLineIcon from '../../../../../public/layout/verticalline.png';
import styles from '@/styles/layout/header/topWrapper/topWrapper.module.css';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
	userEmailAtom,
	userIdAtom,
	userNameAtom,
	userPhoneAtom,
} from '@/recoil/atom/userAtom';

export default function TopWrapper() {
	// supabase 호출
	const supabase = createClient();
	// user state
	const [userName, setUserName] = useRecoilState(userNameAtom);
	const setUserId = useSetRecoilState(userIdAtom);
	const setUserEmail = useSetRecoilState(userEmailAtom);
	const setUserPhone = useSetRecoilState(userPhoneAtom);

	// 로그아웃 클릭 시 동작하는 함수
	const handleLogoutClick = async () => {
		// 로그아웃
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('로그아웃 실패:', error.message);
		}
		setUserId(null);
		setUserName(null);
		setUserEmail(undefined);
		setUserPhone(null);
		// alert
		alert('로그아웃되었습니다.');
	};

	return (
		<div className={styles.topWrapper}>
			{userName && (
				<>
					<p className={styles.userName}>{`${userName}님`}</p>
					<Image
						src={verticalLineIcon}
						alt="vertical line"
						width={2}
						height={15}
					/>
					<button onClick={handleLogoutClick} className={styles.logoutButton}>
						로그아웃
					</button>
				</>
			)}
			{!userName && (
				<>
					<Link href={'/login'} scroll={false}>
						<p>로그인</p>
					</Link>
					<Image
						src={verticalLineIcon}
						alt="vertical line"
						width={2}
						height={15}
					/>
					<Link href={'/signup'} scroll={false}>
						<p>회원가입</p>
					</Link>
				</>
			)}
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={userName ? '/mypage?page=bookReport' : '/login'}>
				<p>마이페이지</p>
			</Link>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={'/cart'}>
				<p>카트</p>
			</Link>
		</div>
	);
}
