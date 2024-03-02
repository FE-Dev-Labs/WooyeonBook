import styles from '@/styles/layout/header/nav.module.css';
import Link from 'next/link';
import NavCategory from './NavCategory';

export default function Nav() {
	const nav = [
		{ name: '홈', link: '/' },
		{ name: '테마추천', link: '/theme' },
		{ name: '인기', link: '/best' },
		{ name: '신간', link: '/new' },
		{ name: '중고도서', link: '/used' },
		{ name: '커뮤니티', link: '/community' },
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
