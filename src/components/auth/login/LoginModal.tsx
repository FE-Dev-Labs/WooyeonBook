'use client';
import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import closeIcon from '../../../../public/common/close.png';
import { createClient } from '@/utils/supabase/client';
import { redirect, useRouter } from 'next/navigation';
import Link from 'next/link';
import Cookies from 'js-cookie';
import useAuth from '@/hooks/useAuth';

export default function LoginModal() {
	const auth = useAuth();
	const router = useRouter();
	const supabase = createClient();

	// const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
	// 	event.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지
	// 	await signIn(); // 비동기 로그인 함수 호출
	// };

	const signIn = async (
		event:
			| React.FormEvent<HTMLFormElement>
			| React.MouseEvent<HTMLButtonElement>,
	) => {
		event.preventDefault(); // 폼 제출로 인한 페이지 새로고침 방지
		if (!auth.checkLoginValidation()) return;

		const { data, error } = await supabase.auth.signInWithPassword({
			email: auth.email,
			password: auth.password,
		});

		if (error) {
			// 에러 처리를 위한 변경
			// 경고창 대신 사용자에게 보여줄 수 있는 방식을 고려해보세요.
			console.log('error');
		}

		// 성공적인 로그인 후의 처리
		router.push('/cart');
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
								<button onClick={signIn} className={styles.loginLeftButton}>
									로그인
								</button>
								<Link href={'/signup'} className={styles.loginRightButton}>
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
