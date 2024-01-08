import Link from 'next/link';
import styles from '@/styles/community/nav.module.css';
function Nav() {
	const communityUrl = (to: string) => {
		return `/community/${to}`;
	};
	return (
		<nav className={styles.container}>
			<Link href={communityUrl('bookReport')}>독후감</Link>
			<Link href={communityUrl('meeting')}>모임</Link>
			<Link href={communityUrl('buyingBook')}>삽니다</Link>
			<Link href={communityUrl('sellingBook')}>팝니다</Link>
		</nav>
	);
}

export default Nav;
