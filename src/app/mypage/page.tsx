'use client';
import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/mypage/mypage.module.css';
import AccordionWrapper from '@/components/common/AccordionWrapper';
import Accordion from '@/components/common/Accordion';
import Communitynav from '@/components/common/Communitynav';
import Myprofile from '@/components/mypage/profile/Myprofile';
import Myorder from '@/components/mypage/myorder/Myorder';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import Mypost from '@/components/mypage/mypost/Mypost';
export default function page() {
	const [isLogin, setIsLogin] = useState(false);
	// // useCurrentUser  훅
	const { userName, userId, getUser } = useCurrentUser('');

	// // 로그인 유뮤 체크
	useEffect(() => {
		getUser();
		if (document.cookie === null || document.cookie === '') {
			setIsLogin(false);
		} else {
			setIsLogin(true);
		}
	}, []);

	// 비로그인시 얼럿창 띄어주기 로그인 유도

	return (
		<>
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
								<Mypost userId={userId} />
							</Accordion>
							<Accordion title={'회원정보'} index={1}>
								<Myprofile userId={userId} />
							</Accordion>
							<Accordion title={'주문내역'} index={2}>
								<Myorder />
							</Accordion>
						</AccordionWrapper>
					</div>
				</div>
			)}
		</>
	);
}
