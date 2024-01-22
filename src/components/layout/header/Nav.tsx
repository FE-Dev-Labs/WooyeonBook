import styles from '@/styles/layout/header/nav.module.css';
import Link from 'next/link';

export default function Nav() {
	const nav = [
		{ name: '홈', link: '/' },
		{ name: '신간도서', link: '/new' },
		{ name: '테마추천', link: '/theme' },
		{ name: '베스트셀러', link: '/best' },
		{ name: '중고도서', link: '/used' },
		{ name: '커뮤니티', link: '/community' },
	];
	const category = [
		{ name: '소설', link: '' },
		{ name: '시/에세이', link: '' },
		{ name: '경제/경영', link: '' },
		{ name: '자기계발', link: '' },
		{ name: '인문', link: '' },
		{ name: '역사/문화', link: '' },
		{ name: '사회/정치', link: '' },
		{ name: '과학', link: '' },
		{ name: '예술/대중문화', link: '' },
		{ name: '종교', link: '' },
		{ name: '가정/생활', link: '' },
	];

	return (
		<div className={styles.navigationWrapper}>
			<div className={styles.navigationCatagoryWrap}>
				<div className={styles.navigationCatagoryItemWrap}>
					분야 <p>▼</p>
				</div>
				<div className={styles.navigationMajorCatagoryWrap}>
					<Link href={``} className={styles.allCatagoryItem}>
						분야 전체 보기
					</Link>
					{category.map((item, index) => (
						<Link key={index} href={item.link}>
							{item.name}
						</Link>
					))}
				</div>
			</div>
			{nav.map((item, index) => (
				<Link key={index} href={item.link}>
					{item.name}
				</Link>
			))}
		</div>
	);
}
