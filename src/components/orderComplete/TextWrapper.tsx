'use client';

import styles from '@/styles/orderComplete/textWrapper.module.css';
import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import Link from 'next/link';

export default function TextWrapper() {
	// useUser에서 호출한 로그인 상태(user_id)
	const { isLoggedIn } = useIsLoggedIn();

	if (isLoggedIn === null) {
		return <div className={styles.textWrapper}>주문이 진행중입니다.</div>;
	}

	return (
		<div className={styles.textWrapper}>
			{isLoggedIn ? (
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
