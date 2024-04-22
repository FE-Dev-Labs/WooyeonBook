'use client';

import styles from '@/styles/layout/header/bottomWrapper/nav/nav.module.css';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NavCategory from './NavCategory';

export default function Nav() {
	//  usePathname 호출
	const pathname = usePathname();

	// link를 파라미터로 받아 className을 바꿔주는 함수
	const linkClassName = (path: string) => {
		// 현재 페이지 경로와 일치하거나, 커뮤니티/베스트/뉴/유즈드로 시작하는 모든 페이지에 스타일 적용
		return path === pathname ||
			(path.startsWith('/community') && pathname.startsWith('/community')) ||
			(path.startsWith('/best') && pathname.startsWith('/best')) ||
			(path.startsWith('/new') && pathname.startsWith('/new')) ||
			(path.startsWith('/used') && pathname.startsWith('/used'))
			? styles.selectedNav
			: styles.navItem;
	};

	// const linkClassName = (path: string) => {
	// 	return path === pathname ? styles.selectedNav : styles.navItem;
	// };

	return (
		<div className={styles.navigationWrapper}>
			<NavCategory />
			<div className={styles.navWrap}>
				{nav.map((item, index) => (
					<Link
						key={index}
						className={linkClassName(item.link)}
						href={item.link}>
						{item.name}
					</Link>
				))}
			</div>
		</div>
	);
}

// 내비 아이템
const nav = [
	{ name: '홈', link: '/' },
	{ name: '테마추천', link: '/theme' },
	{ name: '인기', link: '/best?categoryId=0&pageNum=1' },
	{ name: '신간', link: '/new?categoryId=0&pageNum=1' },
	{ name: '중고도서', link: '/used?categoryId=0&pageNum=1' },
	{ name: '커뮤니티', link: '/community/bookReport' },
];
