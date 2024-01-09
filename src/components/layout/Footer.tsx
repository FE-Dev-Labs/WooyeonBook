import styles from '@/styles/layout//footer.module.css';
import Link from 'next/link';
import Image from 'next/image';
import logoIcon from '../../../public/layout/logo.png';

export default function Footer() {
	return (
		<footer className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.logoWrapper}>
					<Link href="/">
						<Image src={logoIcon} alt="logo" width={120} height={40} />
					</Link>
				</div>
				<div className={styles.textWrapper}>
					<div>
						<p>회사명: (주)데브랩스</p>
						<p>대표이사: 배박김</p>
						<p>개인정보 보호 책임자: 김원준</p>
						<p>E-mail: dbsskdud60@devlabs.co</p>
					</div>
					<div>
						<p>사업자 등록번호: 102-51-02312</p>
						<p>통신판매업 신고번호: 제2023-서울강남-202호</p>
					</div>
					<div>copyright(c) 2024 DevLabs All Rights Reserved</div>
				</div>
			</div>
		</footer>
	);
}
