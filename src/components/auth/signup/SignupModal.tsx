'use client';
import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import logoIcon from '../../../../public/layout/logo.png';
import closeIcon from '../../../../public/common/close.png';
import { redirect } from 'next/navigation';
import uuid from 'react-uuid';
import SignupAddress from './SignupAddress';
import { useRecoilValue } from 'recoil';
import {
	detailAddressAtom,
	roadAddressAtom,
	zipcodeAtom,
} from '@/recoil/atom/signupAtom';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';

export default function SignupModal() {
	const supabase = createClient();

	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [checkPassword, setCheckPassword] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const zipcode = useRecoilValue(zipcodeAtom);
	const address = useRecoilValue(roadAddressAtom);
	const detailaddress = useRecoilValue(detailAddressAtom);

	const nameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};
	const emailChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const passwordChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const checkpasswordChangeHandler = (
		e: React.ChangeEvent<HTMLInputElement>,
	) => {
		setCheckPassword(e.target.value);
	};
	const phoneChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};

	const signUp = async () => {
		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { name, phone },
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
			uuid: user?.id,
			email: email,
			name: name,
			phone: phone,
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
			<div className={styles.modalWrapper}>
				<div className={styles.modalImage}>
					<Image src={logoIcon} alt="logo" width={350} height={65} />
				</div>
				<div className={styles.modalContents}>
					<div className={styles.contents}>
						<div className={styles.title}>
							<span>회원가입</span>
						</div>
						<form action={signUp} className={styles.formWrapper}>
							<div className={styles.inputWrapper}>
								<label className={styles.inputLabel}>
									이름
									<input
										type="text"
										name="name"
										className={styles.inputField}
										placeholder="your name"
										onChange={nameChangeHandler}
									/>
								</label>
								<label className={styles.inputLabel}>
									이메일
									<input
										type="email"
										name="email"
										className={styles.inputField}
										placeholder="your e-mail"
										onChange={emailChangeHandler}
									/>
								</label>
								<label className={styles.inputLabel}>
									비밀번호
									<input
										type="password"
										name="password"
										className={styles.inputField}
										placeholder="your password"
										onChange={passwordChangeHandler}
									/>
								</label>
								<label className={styles.inputLabel}>
									비밀번호확인
									<input
										type="password"
										name="checkPassword"
										className={styles.inputField}
										placeholder="your password confirm"
										onChange={checkpasswordChangeHandler}
									/>
								</label>
								<label className={styles.inputLabel}>
									휴대폰 번호
									<input
										type="text"
										name="phone"
										className={styles.inputField}
										placeholder="your password confirm"
										onChange={phoneChangeHandler}
									/>
								</label>
								<SignupAddress />
							</div>
							<div className={styles.buttonWrapper}>
								<button formAction={signUp} className={styles.signupButton}>
									회원가입
								</button>
							</div>
						</form>
					</div>
					<div className={styles.closeIcon}>
						<Image src={closeIcon} alt="close" width={40} height={40} />
					</div>
				</div>
			</div>
		</div>
	);
}
