'use client';

import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import closeBlackIcon from '@/assets/common/closeBlackIcon.png';
import { redirect, useRouter } from 'next/navigation';
import SignupAddress from './SignupAddress';
import { useRecoilValue } from 'recoil';
import {
	detailAddressAtom,
	roadAddressAtom,
	zipcodeAtom,
} from '@/recoil/atom/signupAtom';
import { createClient } from '@/utils/supabase/client';
import useAuth from '@/hooks/useAuth';

export default function SignupModal() {
	const router = useRouter();
	const auth = useAuth();
	const supabase = createClient();

	const zipcode = useRecoilValue(zipcodeAtom);
	const address = useRecoilValue(roadAddressAtom);
	const detailaddress = useRecoilValue(detailAddressAtom);

	const signUp = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault(); // 폼의 기본 제출 동작 방지

		// validation 통과 하지 못할 시 함수 종료
		if (!auth.checkValidation()) return;

		// 회원가입 로직
		const { data, error } = await supabase.auth.signUp({
			email: auth.email,
			password: auth.password,
			options: {
				data: { name: auth.name, phone: auth.phone },
				emailRedirectTo: `/auth/callback`,
			},
		});

		// 사용자 이미 존재하는 경우 처리
		if (
			error &&
			error.status === 422 &&
			error.message.includes(
				'User already registered' || 'User already registered',
			)
		) {
			alert('이미 가입된 회원입니다.');
			return; // 함수를 여기서 종료
		}

		// 유저 선언
		const {
			data: { user },
		} = await supabase.auth.getUser();

		// 유저 데이터
		const userData = {
			id: user?.id,
			email: auth.email,
			name: auth.name,
			phone: auth.phone,
			address: address,
			zipcode: zipcode,
			detailaddress: detailaddress,
		};

		// users 테이블에 userData 넣기
		const { data: users } = await supabase
			.from('users')
			.insert(userData)
			.select();

		// 성공적인 회원가입 후 처리
		alert('회원가입 완료. 로그인 해주세요.');

		await supabase.auth.signOut();
		router.push('/login', { scroll: false });
	};

	return (
		<div className={styles.container}>
			<div className={styles.modalSignupWrapper}>
				<div className={styles.modalContents}>
					<div className={styles.signupContents}>
						<div className={styles.title}>
							<span>회원가입</span>
						</div>
						<form onSubmit={signUp} className={styles.formWrapper}>
							<div className={styles.inputSignupWrapper}>
								<div className={styles.inputLeftWrapper}>
									<label className={styles.inputLabel}>
										이름
										<input
											type="text"
											name="name"
											className={styles.inputField}
											placeholder="이름을 입력해주세요"
											onChange={auth.changeName}
											ref={auth.nameRef}
										/>
									</label>
									<label className={styles.inputLabel}>
										이메일
										<input
											type="email"
											name="email"
											className={styles.inputField}
											placeholder="이메일을 입력해주세요"
											onChange={auth.changeEmail}
											ref={auth.emailRef}
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
									<label className={styles.inputLabel}>
										비밀번호확인
										<input
											type="password"
											name="checkPassword"
											className={styles.inputField}
											placeholder="비밀번호를 다시 입력해주세요"
											onChange={auth.changeConfirmPassword}
											ref={auth.confirmPasswordRef}
										/>
									</label>
								</div>
								<div className={styles.inputrightWrapper}>
									<label className={styles.inputLabel}>
										휴대폰 번호
										<input
											type="text"
											name="phone"
											className={styles.inputField}
											placeholder="휴대폰 번호를 입력해주세요"
											onChange={auth.changePhone}
											ref={auth.phoneRef}
										/>
									</label>
									<SignupAddress />
								</div>
							</div>
							<button className={styles.signupButton}>회원가입</button>
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
