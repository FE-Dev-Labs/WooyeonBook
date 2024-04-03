'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from '@/styles/community/post/PostNav.module.css';
const Nav = () => {
	const pathname = usePathname().split('/')[4];
	const linkClassName = (path: string) => {
		return path == pathname ? styles.active : styles.navItem;
	};
	return (
		<nav className={styles.navWrap}>
			<Link
				href={'/community/post/new/bookReport'}
				className={linkClassName('bookReport')}>
				독후감
			</Link>
			<Link
				href={'/community/post/new/bookMeeting'}
				className={linkClassName('bookMeeting')}>
				모임
			</Link>
			<Link
				href={'/community/post/new/bookBuying'}
				className={linkClassName('bookBuying')}>
				삽니다
			</Link>
			<Link
				href={'/community/post/new/bookSelling'}
				className={linkClassName('bookSelling')}>
				팝니다
			</Link>
		</nav>
	);
};

export default Nav;
