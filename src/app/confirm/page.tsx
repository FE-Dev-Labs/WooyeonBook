'use client';
import styles from '@/styles/confirm/confirm.module.css';
import Image from 'next/image';
import mailImg from '../../../public/mail.png';
import mailImg2 from '../../../public/mail2.png';
import mailImg3 from '../../../public/mail3.png';
import { useRouter, useSearchParams } from 'next/navigation';

export default function confirm() {
	const params = useSearchParams();
	const useremail = params.get('email');
	const router = useRouter();
	console.log(useremail);
	const hanldeResignup = () => {
		router.push('/signup');
	};
	return (
		<div className={styles.container}>
			<Image src={mailImg3} alt="img" width={200} height={200} />
			<div className={styles.text}>
				환영합니다! <span className={styles.highlight}>이메일 주소</span>를
				인증해주세요.
			</div>
			<div className={styles.containermiddle}>
				<span className={styles.middletext}>
					이메일 인증을 위한 메일이 발송되었습니다.
				</span>
				<span className={styles.middletext}>
					회원가입 완료를 위한 이메일 인증을 진행 해 주세요.
				</span>
			</div>
			<div className={styles.containermiddleEmail}>
				<span className={styles.middletext}>
					가입 이메일 주소 : {useremail}
				</span>
			</div>
			<div className={styles.containerBottom}>
				<span className={styles.middletext}>
					이메일 주소를 잘못 입력하신 경우
				</span>
				<span className={styles.middletext}>
					하단에 '이메일 다시 보내기'버튼을 클릭하면 회원가입 페이지로
					이동합니다.
				</span>
				<span className={styles.middletext}>
					원활한 서비스 이용을 위해 이메일 인증을 진행 해 주세요.
				</span>
			</div>
			<div className={styles.btnWrap}>
				<button
					type="button"
					className={styles.resignupBtn}
					onClick={hanldeResignup}>
					회원가입 다시 하러 가기
				</button>
			</div>
		</div>
	);
}
