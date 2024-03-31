import styles from '@/styles/layout//header/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logoIcon from '../../../../public/layout/logo.png';
import Search from './Search';
import Account from './Account';
import Nav from './bottomWrapper/Nav';
import verticalLineIcon from '../../../../public/layout/verticalline.png';

export default function Header() {
	const isLoggedIn = true;

	return (
		<header className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.topWrapper}>
					<div className={styles.logoWrapper}>
						<Link href="/">
							<Image src={logoIcon} alt="logo" width={160} height={30} />
						</Link>
					</div>
					<div className={styles.inputWrapper}>
						<div className={styles.loginWrapper}>
							{isLoggedIn ? (
								<>
									<Link href={'/sign'}>
										<p>회원가입</p>
									</Link>
									<Image
										src={verticalLineIcon}
										alt="vertical line"
										width={2}
										height={15}
									/>
									<Link href={'/login'}>
										<p>로그인</p>
									</Link>
								</>
							) : (
								<>
									<p>박진양님</p>
									<Image
										src={verticalLineIcon}
										alt="vertical line"
										width={2}
										height={15}
									/>
									<p>로그아웃</p>
								</>
							)}
						</div>
						<Search />
					</div>
				</div>
				<div className={styles.bottomWrapper}>
					<Nav />
					<Account />
				</div>
			</div>
		</header>
	);
}
