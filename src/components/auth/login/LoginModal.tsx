import styles from '@/styles/auth/auth.module.css';
import Image from 'next/image';
import logoIcon from '../../../../public/layout/logo.png';
import closeIcon from '../../../../public/common/close.png';

export default function LoginModal() {
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
						<form className={styles.formWrapper}>
							<div className={styles.inputWrapper}>
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
							</div>
							<div className={styles.buttonWrapper}>
								<input
									type="button"
									value="로그인"
									className={styles.loginLeftButton}
								/>
								<input
									type="button"
									value="회원가입"
									className={styles.loginRightButton}
								/>
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
