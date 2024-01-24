import styles from '@/styles/layout/header/account.module.css';
import Image from 'next/image';
import Link from 'next/link';
import heartIcon from '../../../../public/layout/heart.png';
import accountIcon from '../../../../public/layout/account.png';
import cartIcon from '../../../../public/layout/cart.png';
import loginIcon from '../../../../public/layout/login.png';
import logoutIcon from '../../../../public/layout/logout.png';

export default function Account() {
	const isLoggedin = true;
	return (
		<div className={styles.accountWrapper}>
			{isLoggedin ? (
				<>
					<Link href="/my/like">
						<Image src={loginIcon} alt="login" width={25} height={25} />
					</Link>
					<div>
						<Image src={accountIcon} alt="account" width={25} height={25} />
					</div>
					<Link href="/my/cart">
						<Image src={cartIcon} alt="cart" width={25} height={25} />
					</Link>
				</>
			) : (
				<>
					<Link href="/my/like">
						<Image src={logoutIcon} alt="logout" width={25} height={25} />
					</Link>
					<div>
						<Image src={accountIcon} alt="account" width={25} height={25} />
					</div>
					<Link href="/my/cart">
						<Image src={cartIcon} alt="cart" width={25} height={25} />
					</Link>
				</>
			)}
		</div>
	);
}
