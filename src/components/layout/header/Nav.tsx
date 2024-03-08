import styles from '@/styles/layout/header/nav.module.css';
import Link from 'next/link';
import NavCategory from './NavCategory';

export default function Nav() {
	const nav = [
		{ name: '홈', link: '/' },
		{ name: '신간도서', link: '/new' },
		{ name: '테마추천', link: '/theme' },
		{ name: '베스트셀러', link: '/best' },
		{ name: '중고도서', link: '/used' },
		{ name: '커뮤니티', link: '/community/bookReport' },
	];

	return (
		<div className={styles.navigationWrapper}>
			<NavCategory />
			{nav.map((item, index) => (
				<Link key={index} href={item.link}>
					{item.name}
				</Link>
			))}
		</div>
	);
}
