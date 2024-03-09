'use client';

import styles from '@/styles/layout/header/nav.module.css';
import Link from 'next/link';
import NavCategory from './NavCategory';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

export default function Nav() {
	// usePathname 호출
	const pathname = usePathname();
	// 선택된 내비 아이템 state
	const [selectedNav, setSelectedNav] = useState(pathname);

	// 내비 아이템 선택 시 실행되는 함수
	const handleNavClick = (link: string) => {
		setSelectedNav(link);
	};

	// 선택된 내비 아이템 업데이트 해주는 useEffect
	useEffect(() => {
		setSelectedNav(pathname);
		// 주소가 변경될 때
	}, [pathname]);

	return (
		<div className={styles.navigationWrapper}>
			<NavCategory />
			{nav.map((item, index) => (
				<Link
					key={index}
					href={item.link}
					onClick={() => {
						handleNavClick(item.link);
					}}
					className={`${(selectedNav === item.link || (selectedNav === '/community/bookReport' && item.link.startsWith('/community'))) && styles.selectedNav}`}>
					{item.name}
				</Link>
			))}
		</div>
	);
}

// 내비 아이템
const nav = [
	{ name: '홈', link: '/' },
	{ name: '테마추천', link: '/theme' },
	{ name: '인기', link: '/best' },
	{ name: '신간', link: '/new' },
	{ name: '중고도서', link: '/used' },
	{ name: '커뮤니티', link: '/community/bookReport' },
];
