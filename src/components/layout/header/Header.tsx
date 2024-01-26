import styles from '@/styles/layout//header/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logoIcon from '../../../../public/layout/logo.png';
import Search from './Search';
import Account from './Account';
import Nav from './Nav';

export default function Header() {
	return (
		<header className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.topWrapper}>
					<Link href="/">
						<Image src={logoIcon} alt="logo" width={120} height={22} />
					</Link>
					<Search />
				</div>
				<div className={styles.bottomWrapper}>
					<Nav />
					<Account />
				</div>
			</div>
		</header>
	);
}
