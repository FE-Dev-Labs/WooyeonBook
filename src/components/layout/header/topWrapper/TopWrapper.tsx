'use client';

import Image from 'next/image';
import Link from 'next/link';
import verticalLineIcon from '../../../../../public/layout/verticalline.png';
import styles from '@/styles/layout/header/topWrapper/topWrapper.module.css';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';

export default function TopWrapper() {
	// useIsLoggedIn에서 호출한 로그인상태 및 유저네임
	const { isLoggedIn, userName } = useIsLoggedIn();
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
					<p>로그아웃</p>
				</>
			) : (
				<>
					<Link href={'/login'}>
						<p className={styles.userName}>로그인</p>
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
