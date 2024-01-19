import styles from '@/styles/auth/signup/signupModal.module.css';
import Image from 'next/image';
import logoIcon from '../../../../public/layout/logo.png';
import closeIcon from '../../../../public/common/close.png';

interface SignupProps {
	isSignupOpen?: boolean;
	setIsSignupOpen?: (value: boolean) => void;
}

// export default function Signup({ isSignupOpen, setIsSignupOpen }: SignupProps) {
export default function SignupModal() {
	return (
		<>
			{/* <button onClick={() => setIsSignupOpen(true)}>회원가입</button> */}
			{/* {isSignupOpen && ( */}
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
							<form className={styles.formWrapper}>
								<div className={styles.inputWrapper}>
									<label className={styles.inputLabel}>
										이름
										<input
											type="text"
											className={styles.inputField}
											placeholder="your name"
										/>
									</label>
									<label className={styles.inputLabel}>
										이메일
										<input
											type="email"
											className={styles.inputField}
											placeholder="your e-mail"
										/>
									</label>
									<label className={styles.inputLabel}>
										비밀번호
										<input
											type="password"
											className={styles.inputField}
											placeholder="your password"
										/>
									</label>
									<label className={styles.inputLabel}>
										비밀번호확인
										<input
											type="password"
											className={styles.inputField}
											placeholder="your password confirm"
										/>
									</label>
								</div>
								<div className={styles.buttonWrapper}>
									<input type="button" value="회원가입" />
								</div>
							</form>
						</div>
						<div className={styles.closeIcon}>
							<Image src={closeIcon} alt="close" width={40} height={40} />
						</div>
					</div>
					{/* <div className={styles.modalContent}>
						<span className={styles.close}>X</span>
						<form className={styles.form}>
							<label>
								이름:
								<input type="text" name="name" />
							</label>
							<label>
								이메일:
								<input type="email" name="email" />
							</label>
							<label>
								비밀번호:
								<input type="password" name="password" />
							</label>
							<input type="submit" value="회원가입" />
						</form>
					</div> */}
				</div>
			</div>

			{/* )} */}
		</>
	);
}
