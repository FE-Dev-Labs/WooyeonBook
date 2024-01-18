import styles from '@/styles/layout/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logoIcon from '../../../public/layout/logo.png';
import searchIcon from '../../../public/common/search.png';
import heartIcon from '../../../public/layout/heart.png';
import accountIcon from '../../../public/layout/account.png';
import cartIcon from '../../../public/layout/cart.png';

export default function Header() {
	const nav = [
		{ name: '분야', link: '/category' },
		{ name: '신간도서', link: '/new' },
		{ name: '테마추천', link: '/theme' },
		{ name: '베스트셀러', link: '/bestseller' },
		{ name: '중고도서', link: '/used' },
		{ name: '커뮤니티', link: '/community' },
	];

	return (
		<header className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.topWrapper}>
					<Link href="/">
						<Image src={logoIcon} alt="logo" width={120} height={40} />
					</Link>
					<div className={styles.searchForm}>
						<input
							type="text"
							placeholder="작가명 또는 책 제목을 입력하세요."
						/>
						<div className={styles.searchIcon}>
							<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
						</div>
					</div>
				</div>
				<div className={styles.bottomWrapper}>
					<div className={styles.navigationWrapper}>
						{nav.map((item, index) => (
							<Link key={index} href={item.link}>
								{item.name}
							</Link>
						))}
					</div>
					<div className={styles.accountWrapper}>
						<Link href="/my/like">
							<Image src={heartIcon} alt="heart" width={25} height={25} />
						</Link>
						<Link href="/my">
							<Image src={accountIcon} alt="account" width={25} height={25} />
						</Link>
						<Link href="/my/cart">
							<Image src={cartIcon} alt="cart" width={25} height={25} />
						</Link>
					</div>
				</div>
			</div>
		</header>
	);
}
