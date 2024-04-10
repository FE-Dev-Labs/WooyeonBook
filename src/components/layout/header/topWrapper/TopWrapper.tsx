'use client';

import Image from 'next/image';
import Link from 'next/link';
import verticalLineIcon from '../../../../../public/layout/verticalline.png';
import styles from '@/styles/layout/header/topWrapper/topWrapper.module.css';
import { createClient } from '@/utils/supabase/client';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { useEffect } from 'react';

export default function TopWrapper() {
	// supabase 선언
	const supabase = createClient();
	// useUser에서 호출한 로그인상태 및 유저네임
	const { isLoggedIn, userName } = useIsLoggedIn();

	// 로그아웃 함수
	const handleLogout = async () => {
		// 로그아웃
		const { error } = await supabase.auth.signOut();
		if (error) {
			console.error('로그아웃 실패:', error.message);
		}

		// alert
		alert('로그아웃되었습니다.');
		// 새로고침
		window.location.reload();
	};

	useEffect(() => {}, []);

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
