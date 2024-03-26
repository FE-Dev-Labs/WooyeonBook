import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import logoIcon from '../../../../public/layout/logo.png';
import closeIcon from '../../../../public/common/close.png';
import { cookies, headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import uuid from 'react-uuid';
import SignupAddress from './SignupAddress';

export default function SignupModal() {
	const signUp = async (formData: FormData) => {
		'use server';

		const origin = headers().get('origin');
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;
		const phone = formData.get('phone') as string;
		// const address = formData.get('address') as string;
		// const zipcode = formData.get('zipcode') as string;
		// const detailaddress = formData.get('detailaddress') as string;

		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signUp({
			email,
			password,
			options: {
				data: { name, phone },
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});
		if (error) throw error;
		const { data } = await supabase.auth.getUser();
		if (error) {
			console.log(error);
		}
		const userData = {
			uuid: uuid(),
			email: email,
			name: name,
			phone: phone,
			// address: address,
			// zipcode: zipcode,
			// detailaddress: detailaddress,
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
		<div className={styles.Container}>
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
									/>
								</label>
								<label className={styles.inputLabel}>
									이메일
									<input
										type="email"
										name="email"
										className={styles.inputField}
										placeholder="your e-mail"
									/>
								</label>
								<label className={styles.inputLabel}>
									비밀번호
									<input
										type="password"
										name="password"
										className={styles.inputField}
										placeholder="your password"
									/>
								</label>
								<label className={styles.inputLabel}>
									비밀번호확인
									<input
										type="password"
										name="checkPassword"
										className={styles.inputField}
										placeholder="your password confirm"
									/>
								</label>
								<label className={styles.inputLabel}>
									휴대폰 번호
									<input
										type="text"
										name="phone"
										className={styles.inputField}
										placeholder="your password confirm"
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
