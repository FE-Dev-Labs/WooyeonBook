'use client';
import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import closeIcon from '../../../../public/common/close.png';
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

	const signUp = async () => {
		if (!auth.checkValidation()) return;
		const { error } = await supabase.auth.signUp({
			email: auth.email,
			password: auth.password,
			options: {
				data: { name: auth.name, phone: auth.phone },
				emailRedirectTo: `/auth/callback`,
			},
		});
		if (error) throw error;
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (error) {
			console.log(error);
		}
		const userData = {
			id: user?.id,
			email: auth.email,
			name: auth.name,
			phone: auth.phone,
			address: address,
			zipcode: zipcode,
			detailaddress: detailaddress,
		};
		const { data: users } = await supabase
			.from('users')
			.insert(userData)
			.select();
		if (error) {
			return redirect('/?message=Could not authenticate user');
		}
		return redirect('/');
	};

	return (
		<div className={styles.container}>
			<div className={styles.modalSignupWrapper}>
				<div className={styles.modalContents}>
					<div className={styles.signupContents}>
						<div className={styles.title}>
							<span>회원가입</span>
						</div>
						<form action={signUp} className={styles.formWrapper}>
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
							<div className={styles.buttonWrapper}>
								<button formAction={signUp} className={styles.signupButton}>
									회원가입
								</button>
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
