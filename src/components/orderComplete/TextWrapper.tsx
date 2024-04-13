'use client';

import styles from '@/styles/orderComplete/textWrapper.module.css';
import Link from 'next/link';
import { useRecoilValue } from 'recoil';
import { userIdAtom } from '@/recoil/atom/userAtom';

export default function TextWrapper() {
	// 로그인 판별 및 유저 id
	const userId = useRecoilValue(userIdAtom);

	if (userId === null) {
		return <div className={styles.textWrapper}>주문이 진행중입니다.</div>;
	}

	return (
		<div className={styles.textWrapper}>
			{userId ? (
				<>
					<p>주문이 완료되었습니다. 😎</p>
					<Link href="/mypage?page=bookMeeting">
						<p>마이페이지에서 주문 내역을 확인하세요!</p>
					</Link>
				</>
			) : (
				<p>주문내역을 불러올 수 없습니다. 로그인 해주세요.</p>
			)}
		</div>
	);
}
