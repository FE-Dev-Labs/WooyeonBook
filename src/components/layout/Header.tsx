import styles from '@/styles/common/header/header.module.css';
import Image from 'next/image';
import Link from 'next/link';
import logo from '../../../public/layout/logo.png';
import searchIcon from '../../../public/common/searchIcon.png';

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
						<Image src={logo} alt="logo" width={120} height={40} />
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
					<div>아이콘</div>
				</div>
			</div>
		</header>
	);
}
