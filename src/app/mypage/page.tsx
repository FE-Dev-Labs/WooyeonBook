'use client';
import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/mypage/mypage.module.css';
import AccordionWrapper from '@/components/common/AccordionWrapper';
import Accordion from '@/components/common/Accordion';
import Communitynav from '@/components/common/Communitynav';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import MyPost from '@/components/mypage/mypost/MyPost';
import MyOrder from '@/components/mypage/myorder/MyOrder';
import MyProfile from '@/components/mypage/profile/MyProfile';

export default function page() {
	const [isLogin, setIsLogin] = useState(false);
	// // useCurrentUser  훅
	const { userName, userId } = useCurrentUser('');

	// // 로그인 유뮤 체크
	useEffect(() => {
		if (document.cookie === null || document.cookie === '') {
			setIsLogin(false);
		} else {
			setIsLogin(true);
		}
	}, []);

	// 비로그인시 얼럿창 띄어주기 로그인 유도

	return (
		<div>
			{isLogin && (
				<div>
					<PageHeader title="mypage" />
					<div className={styles.container}>
						<div className={styles.wrapper}>
							<h1 className={styles.userName}>{userName}님, </h1>
							<h1 className={styles.userNameText}>안녕하세요!</h1>
						</div>
						<AccordionWrapper>
							<Accordion title={'내가쓴글'} index={0}>
								<Communitynav />
								<MyPost userId={userId} />
							</Accordion>
							<Accordion title={'회원정보'} index={1}>
								<MyProfile userId={userId} />
							</Accordion>
							<Accordion title={'주문내역'} index={2}>
								<MyOrder userId={userId} />
							</Accordion>
						</AccordionWrapper>
					</div>
				</div>
			)}
		</div>
	);
}
