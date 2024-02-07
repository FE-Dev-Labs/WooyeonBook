import Link from 'next/link';
import styles from '@/styles/community/nav.module.css';
function Nav() {
	const communityUrl = (to: string) => {
		return `/community/${to}`;
	};

	return (
		<nav className={styles.container}>
			<div className={styles.linkWrap}>
				<Link className={styles.linkItem} href={communityUrl('bookReport')}>
					독후감
				</Link>
				<Link className={styles.linkItem} href={communityUrl('meeting')}>
					모임
				</Link>
				<Link className={styles.linkItem} href={communityUrl('buyingBook')}>
					삽니다
				</Link>
				<Link className={styles.linkItem} href={communityUrl('sellingBook')}>
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
