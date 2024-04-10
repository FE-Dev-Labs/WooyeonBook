'use client';
import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import closeIcon from '../../../../public/common/close.png';
import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
// import Cookies from 'js-cookie';
import useAuth from '@/hooks/useAuth';

export default function LoginModal() {
	const auth = useAuth();
	const router = useRouter();
	const supabase = createClient();

	// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지
	// 	await signIn(); // 비동기 로그인 함수 호출
	// };

	const signIn = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지

		// validation 통과 하지 못할 시 함수 종료
		if (!auth.checkLoginValidation()) return;

		// 로그인
		const { data, error } = await supabase.auth.signInWithPassword({
			email: auth.email,
			password: auth.password,
		});
		if (error) {
			console.error('로그인 실패:', error.message);
		}

		// 성공적인 로그인 후 처리
		alert('환영합니다!');
		router.back();
	};

	return (
		<div className={styles.container}>
			<div className={styles.modalWrapper}>
				<div className={styles.modalContents}>
					<div className={styles.contents}>
						<div className={styles.title}>
							<span>로그인</span>
						</div>
						<form onSubmit={signIn} className={styles.formWrapper}>
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
								<Link
									href={'/signup'}
									scroll={false}
									className={styles.loginRightButton}>
									회원가입
								</Link>
							</div>
						</form>
					</div>
					<div className={styles.closeIcon} onClick={() => router.back()}>
						<Image src={closeIcon} alt="close" width={40} height={40} />
					</div>
				</div>
			</div>
		</div>
	);
}
