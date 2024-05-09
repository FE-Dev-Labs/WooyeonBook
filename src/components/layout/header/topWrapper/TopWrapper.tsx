'use client';

import Image from 'next/image';
import Link from 'next/link';
import verticalLineIcon from '@/assets/layout/verticalLineIcon.png';
import styles from '@/styles/layout/header/topWrapper/topWrapper.module.css';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';
import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function TopWrapper() {
	// supabase 호출
	const supabase = createClient();
	// useRouter 호출
	const router = useRouter();
	// usePathname 호출
	const pathname = usePathname();

	// user state
	const [user, setUser] = useRecoilState(userAtom);
	// 로그인 버튼 state
	const [loginBtnWord, setLoginBtnWord] = useState<string>('로그인');
	// 회원가입 버튼 state
	const [signupBtnWord, setSignupBtnWord] = useState<string>('회원가입');

	// 로그인 버튼(첫번째 버튼) 클릭 시 작동하는 함수
	const handleLoginBtnWordClick = () => {
		if (user.id === null) router.push('/login', { scroll: false });
		return;
	};
	// 회원가입 버튼(두번째 버튼) 클릭 시 작동하는 함수
	const handleSignupBtnWordClick = async () => {
		if (user.id) {
			try {
				await supabase.auth.signOut();
				if (pathname.startsWith('/mypage')) {
					router.push('/', { scroll: false });
				}
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
		}
		if (user.id === null) router.push('/signup', { scroll: false });
	};
	// 마이페이지 클릭 시 작동하는 함수
	const handleMypageBtnClick = () => {
		if (user.id) router.push('/mypage?page=bookReport');
		if (user.id === null) router.push('/login', { scroll: false });
	};

	// 유저 상태 뿌려줄 useEffect
	useEffect(() => {
		if (user.id) {
			setLoginBtnWord(`${user.name}님`);
			setSignupBtnWord('로그아웃');
		}
		if (user.id === null) {
			setLoginBtnWord('로그인');
			setSignupBtnWord('회원가입');
		}
	}, [user.id]);

	return (
		<div className={styles.topWrapper}>
			<button className={styles.userName} onClick={handleLoginBtnWordClick}>
				{loginBtnWord}
			</button>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<button onClick={handleSignupBtnWordClick}>{signupBtnWord}</button>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<button onClick={handleMypageBtnClick}>마이페이지</button>
			<Image src={verticalLineIcon} alt="vertical line" width={2} height={15} />
			<Link href={'/cart'}>
				<p>카트</p>
			</Link>
		</div>
	);
}
