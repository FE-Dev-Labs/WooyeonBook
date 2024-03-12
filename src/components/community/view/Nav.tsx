'use client';
import Link from 'next/link';
import styles from '@/styles/community/nav.module.css';
import communityPathname from '@/apis/communityPathname';
function Nav() {
	const pathname = communityPathname();
	const communityUrl = (to: string) => {
		return `/community/${to}`;
	};
	const postUrl = () => {
		return `/community/post/new/${pathname}`;
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
					className={linkClassName('bookMeeting')}
					href={communityUrl('bookMeeting')}>
					모임
				</Link>
				<Link
					className={linkClassName('bookBuying')}
					href={communityUrl('bookBuying')}>
					삽니다
				</Link>
				<Link
					className={linkClassName('bookSelling')}
					href={communityUrl('bookSelling')}>
					팝니다
				</Link>
			</div>
			<Link className={styles.writeBtn} href={`${postUrl()}`}>
				글쓰기
			</Link>
		</nav>
	);
}

export default Nav;
