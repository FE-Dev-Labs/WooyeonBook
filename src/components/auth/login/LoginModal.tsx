'use client';

import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import closeBlackIcon from '@/assets/common/closeBlackIcon.png';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import useAuth from '@/hooks/useAuth';
import { useSetRecoilState } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';

export default function LoginModal() {
	// useRouter 호출
	const router = useRouter();
	// useAuth 호출
	const auth = useAuth();
	// createClient 호출
	const supabase = createClient();
	// user setState
	const setUser = useSetRecoilState(userAtom);

	// 로그인 버튼 클릭 시 동작하는 함수
	const handleLoginClick = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지

		// validation 통과 못할 시 함수 종료
		if (!auth.checkLoginValidation()) return;

		// 로그인
		const { data, error } = await supabase.auth.signInWithPassword({
			email: auth.email,
			password: auth.password,
		});

		if (error) {
			// 에러 발생할 경우
			console.error('로그인 실패:', error.message);
		} else if (data && data.user) {
			// 로그인에 성공했을 경우 setState 및 alert
			setUser({
				id: data.user.id,
				name: data.user.user_metadata.name,
				email: data.user.email,
				phone: data.user.user_metadata.phone,
			});
			alert('환영합니다!');
			router.back();
			window.scrollTo(0, 0); // router.back에 {scroll: false} 옵션 X
		}
	};

	return (
		<div className={styles.container}>
			<div className={styles.modalWrapper}>
				<div className={styles.modalContents}>
					<div className={styles.contents}>
						<div className={styles.title}>
							<span>로그인</span>
						</div>
						<form onSubmit={handleLoginClick} className={styles.formWrapper}>
							<div className={styles.inputWrapper}>
								<label className={styles.inputLabel}>
									이메일
									<input
										type="email"
										name="email"
										className={styles.inputField}
										onChange={auth.changeEmail}
										ref={auth.emailRef}
										placeholder="이메일을 입력해주세요"
									/>
								</label>
								<label className={styles.inputLabel}>
									비밀번호
									<input
										type="password"
										name="password"
										className={styles.inputField}
										placeholder="비밀번호를 입력해주세요"
										onChange={auth.changePassword}
										ref={auth.passwordRef}
									/>
								</label>
							</div>
							<div className={styles.buttonWrapper}>
								<button className={styles.loginLeftButton}>로그인</button>
								{/* <Link
									href={'/signup'}
									scroll={false}
									className={styles.loginRightButton}>
									회원가입
								</Link> */}
							</div>
						</form>
					</div>
					<div className={styles.closeIcon} onClick={() => router.back()}>
						<Image src={closeBlackIcon} alt="close" width={40} height={40} />
					</div>
				</div>
			</div>
		</div>
	);
}
