'use client';

import styles from '@/styles/orderComplete/textWrapper.module.css';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';
import { useEffect, useState } from 'react';

export default function TextWrapper() {
	// 로그인 판별 및 유저 id
	const user = useRecoilValue(userAtom);
	// 로딩 state
	const [isLoading, setIsLoading] = useState<boolean>(false);
	useEffect(() => {
		setTimeout(() => {
			setIsLoading(true);
		}, 3000);
	}, []);

	return (
		<div className={styles.textWrapper}>
			{!isLoading ? (
				<p>주문이 진행중입니다. 😎</p>
			) : user && user.name ? (
				<>
					<p>{user.name}님! 주문이 완료되었습니다. 😎</p>
					<Link href="/mypage?page=bookMeeting">
						<p>마이페이지에서 주문 내역을 확인하세요!</p>
					</Link>
				</>
			) : (
				<p>주문내역을 불러올 수 없습니다. 로그인 해주세요.</p>
			)}
			{/* {user && user.name && (
				<>
					<p>{user.name}님! 주문이 완료되었습니다. 😎</p>
					<Link href="/mypage?page=bookMeeting">
						<p>마이페이지에서 주문 내역을 확인하세요!</p>
					</Link>
				</>
			)}
			{!user ||
				(!user.name && <p>주문내역을 불러올 수 없습니다. 로그인 해주세요.</p>)} */}
		</div>
	);
}
