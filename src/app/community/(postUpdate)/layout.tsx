'use client';
import type { BasicLayoutType } from '@/types/layoutType';
import styles from '@/styles/community/post/PostLayout.module.css';
import Link from 'next/link';
import RecoilRootWrapper from '@/recoil/RecoilRootWrapper';

export default function PostLayout({ children }: BasicLayoutType) {
	return (
		<div className={styles.container}>
			<div className={styles.viewWrap}>
				<div className={styles.nav}>
					<Link href={'/community/post/new?page=bookReport'}>독후감</Link>
					<Link href={'/community/post/new?page=bookMeeting'}>모임</Link>
					<Link href={'/community/post/new?page=bookBuying'}>삽니다</Link>
					<Link href={'/community/post/new?page=bookSelling'}>팝니다</Link>
				</div>
				<RecoilRootWrapper>{children}</RecoilRootWrapper>
			</div>
		</div>
	);
}
