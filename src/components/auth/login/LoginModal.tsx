import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import logoIcon from '../../../../public/layout/logo.png';
import closeIcon from '../../../../public/common/close.png';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';

export default function LoginModal() {
	const signIn = async (formData: FormData) => {
		'use server';

		const email = formData.get('email') as string;
		const password = formData.get('password') as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase.auth.signInWithPassword({
			email,
			password,
		});

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
							<span>로그인</span>
						</div>
						<form action={signIn} className={styles.formWrapper}>
							<div className={styles.inputWrapper}>
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
							</div>
							<div className={styles.buttonWrapper}>
								<button formAction={signIn} className={styles.loginLeftButton}>
									로그인
								</button>
								<button className={styles.loginRightButton}>회원가입</button>
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
