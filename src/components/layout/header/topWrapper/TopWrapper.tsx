'use client';

import { useUser } from '@/hooks/useUser';
import Image from 'next/image';
import Link from 'next/link';
import verticalLineIcon from '../../../../../public/layout/verticalline.png';
import styles from '@/styles/layout/header/topWrapper/topWrapper.module.css';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

export default function TopWrapper() {
	const supabase = createClient();
	const router = useRouter();
	// useUser에서 호출한 로그인상태 및 유저네임
	const { isLoggedIn, userName } = useUser();

	const handleLogout = async () => {
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('로그아웃 실패:', error.message);
		} else {
			// 로그아웃 성공 후 쿠키에서 토큰 제거
			Cookies.remove('sb-access-token');
			Cookies.remove('sb-refresh-token');

			// 홈페이지로 리디렉션
			return window.location.reload();
			// router.push('/');
		}
	};
	return (
		<div className={styles.topWrapper}>
			{isLoggedIn ? (
				<>
					<p className={styles.userName}>{`${userName}님`}</p>
					<Image
						src={verticalLineIcon}
						alt="vertical line"
						width={2}
						height={15}
					/>
					<button onClick={handleLogout} className={styles.logoutButton}>
						로그아웃
					</button>
				</>
			) : (
				<>
					<Link href={'/login'}>
						<p>로그인</p>
					</Link>
					<Image
						src={verticalLineIcon}
						alt="vertical line"
						width={2}
						height={15}
					/>
					<Link href={'/signup'}>
						<p>회원가입</p>
					</Link>
				</>
			)}
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={isLoggedIn ? '/mypage?page=bookReport' : '/login'}>
				<p>마이페이지</p>
			</Link>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={'/cart'}>
				<p>카트</p>
			</Link>
		</div>
	);
}
