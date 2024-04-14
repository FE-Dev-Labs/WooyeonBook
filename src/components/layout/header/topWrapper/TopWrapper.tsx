'use client';

import Image from 'next/image';
import Link from 'next/link';
import verticalLineIcon from '../../../../../public/layout/verticalline.png';
import styles from '@/styles/layout/header/topWrapper/topWrapper.module.css';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';
import { useEffect, useState } from 'react';

export default function TopWrapper() {
	// supabase 호출
	const supabase = createClient();
	// user state
	const [user, setUser] = useRecoilState(userAtom);

	// 로그아웃 클릭 시 동작하는 함수
	const handleLogoutClick = async () => {
		try {
			await supabase.auth.signOut();
			console.log('로그아웃 성공!');
			setUser({
				id: null,
				name: null,
				email: undefined,
				phone: null,
			});
			alert('로그아웃 되었습니다.');
		} catch (error) {
			console.error('로그아웃 실패:', error);
			alert('로그아웃에 실패했습니다. 다시 시도해주세요.');
		}
	};

	return (
		<div className={styles.topWrapper}>
			<Link href={'/login'} scroll={false}>
				<p>로그인</p>
			</Link>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={'/signup'} scroll={false}>
				<p>회원가입</p>
			</Link>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={'/login'}>
				<p>마이페이지</p>
			</Link>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={'/cart'}>
				<p>카트</p>
			</Link>
		</div>
	);
}

// 아래와 같은 코드를 사용하면 Warning: Text content did not match. Server: "user.name" Client: "로그인" 발생
// {
// 	user && user.name && (
// 		<>
// 			<p className={styles.userName}>{`${user.name}님`}</p>
// 			<Image
// 				src={verticalLineIcon}
// 				alt="vertical line"
// 				width={2}
// 				height={15}
// 			/>
// 			<button onClick={handleLogoutClick} className={styles.logoutButton}>
// 				로그아웃
// 			</button>
// 		</>
// 	);
// }
// {
// 	!user ||
// 		(!user.name && (
// 			<>
// 				<Link href={'/login'} scroll={false}>
// 					<p>로그인</p>
// 				</Link>
// 				<Image
// 					src={verticalLineIcon}
// 					alt="vertical line"
// 					width={2}
// 					height={15}
// 				/>
// 				<Link href={'/signup'} scroll={false}>
// 					<p>회원가입</p>
// 				</Link>
// 			</>
// 		));
// }
