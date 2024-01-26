'use client';
import Link from 'next/link';
import styles from '@/styles/community/post/Nav.module.css';

export default function Nav() {
	return (
		<nav className={styles.container}>
			<Link href={'community/post/new?type=bookReport'}>독후감</Link>
			<Link href={'community/post/new?type=meeting'}>모임</Link>
			<Link href={'community/post/new?type=buyingBook'}>삽니다</Link>
			<Link href={'community/post/new?type=sellingBook'}>팝니다</Link>
		</nav>
	);
}
