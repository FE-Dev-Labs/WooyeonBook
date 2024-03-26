import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import logoIcon from '../../../../public/layout/logo.png';
import closeIcon from '../../../../public/common/close.png';
import { cookies, headers } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
interface SignupProps {
	isSignupOpen?: boolean;
	setIsSignupOpen?: (value: boolean) => void;
}

export default function SignupModal() {
	const signUp = async (formData: FormData) => {
		'use server';

		const origin = headers().get('origin');
		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const name = formData.get('name') as string;
		const phone = formData.get('phone') as string;
		const address = formData.get('address') as string;

		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signUp({
			email,
			password,

			options: {
				data: { name, phone, address },
				emailRedirectTo: `${origin}/auth/callback`,
			},
		});
		if (error) throw error;
		// const {
		// 	data: { session },
		// } = await supabase.auth.getSession();
		// if (error) {
		// 	console.log(error);
		// }
		// const userData = {
		// 	uuid: session?.user.id as string,
		// 	email: session?.user.email as string,
		// 	name: '',
		// 	phone: '',
		// 	adress: '',
		// };
		// const { data: users } = await supabase
		// 	.from('users')
		// 	.insert(userData)
		// 	.select();
		// if (error) {
		// 	return redirect('/?message=Could not authenticate user');
		// }

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
										type="name"
										className={styles.inputField}
										name="name"
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
										type="checkPassword"
										name="checkPassword"
										className={styles.inputField}
										placeholder="your password confirm"
									/>
								</label>
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
