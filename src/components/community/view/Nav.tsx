'use client';
import Link from 'next/link';
import styles from '@/styles/community/nav.module.css';
import communityPathname from '@/apis/communityPathname';
function Nav() {
	const pathname = communityPathname();
	const communityUrl = (to: string) => {
		return `/community/${to}`;
	};
	const linkClassName = (path: string) => {
		return path == pathname ? styles.active : styles.linkItem;
	};
	return (
		<nav className={styles.container}>
			<div className={styles.linkWrap}>
				<Link
					className={linkClassName('bookReport')}
					href={communityUrl('bookReport')}>
					독후감
				</Link>
				<Link
					className={linkClassName('meeting')}
					href={communityUrl('meeting')}>
					모임
				</Link>
				<Link
					className={linkClassName('buyingBook')}
					href={communityUrl('buyingBook')}>
					삽니다
				</Link>
				<Link
					className={linkClassName('sellingBook')}
					href={communityUrl('sellingBook')}>
					팝니다
				</Link>
			</div>
			<Link className={styles.writeBtn} href={``}>
				글쓰기
			</Link>
		</nav>
	);
}

export default Nav;
