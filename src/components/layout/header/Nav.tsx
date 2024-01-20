import styles from '@/styles/layout/header/nav.module.css';
import Link from 'next/link';

export default function Nav() {
	const nav = [
		{ name: '분야', link: '/' },
		{ name: '홈', link: '/' },
		{ name: '신간도서', link: '/new' },
		{ name: '테마추천', link: '/recommendation' },
		{ name: '베스트셀러', link: '/bestseller' },
		{ name: '중고도서', link: '/used' },
		{ name: '커뮤니티', link: '/community' },
	];

	return (
		<div className={styles.navigationWrapper}>
			{nav.map((item, index) => (
				<Link key={index} href={item.link}>
					{item.name}
				</Link>
			))}
		</div>
	);
}
