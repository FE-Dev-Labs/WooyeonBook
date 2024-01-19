import styles from '@/styles/auth/signup/signup.module.css';
import Image from 'next/image';
import logoIcon from '../../../../public/layout/logo.png';

interface SignupProps {
	isSignupOpen?: boolean;
	setIsSignupOpen?: (value: boolean) => void;
}

// export default function Signup({ isSignupOpen, setIsSignupOpen }: SignupProps) {
export default function Signup() {
	return (
		<>
			{/* <button onClick={() => setIsSignupOpen(true)}>회원가입</button> */}
			{/* {isSignupOpen && ( */}
			<div className={styles.Container}>
				<div className={styles.modalWrapper}>
					<div className={styles.modalImage}>
						<Image src={logoIcon} alt="logo" width={350} height={75} />
					</div>
					<div className={styles.modalContents}></div>
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
