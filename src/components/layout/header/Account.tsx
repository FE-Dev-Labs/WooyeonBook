import styles from '@/styles/layout/header/account.module.css';
import Image from 'next/image';
import Link from 'next/link';
import accountIcon from '../../../../public/layout/account.png';
import cartIcon from '../../../../public/layout/cart.png';
import loginIcon from '../../../../public/layout/login.png';
import logoutIcon from '../../../../public/layout/logout.png';

export default function Account() {
	const isLoggedin = false;
	return (
		<div className={styles.accountWrapper}>
			<Link href={isLoggedin ? '/mypage?page=bookReport' : '/login'}>
				<Image src={accountIcon} alt="account" width={25} height={25} />
			</Link>
			<Link href="/cart">
				<Image src={cartIcon} alt="cart" width={25} height={25} />
			</Link>
		</div>
	);
}
