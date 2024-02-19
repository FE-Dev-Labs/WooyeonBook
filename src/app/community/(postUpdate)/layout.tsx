'use client';
import type { BasicLayoutType } from '@/types/layoutType';
import styles from '@/styles/community/post/PostLayout.module.css';
import Link from 'next/link';
import { RecoilRoot } from 'recoil';

export default function PostLayout({ children }: BasicLayoutType) {
	return (
		<RecoilRoot>
			<div className={styles.container}>
				<div className={styles.viewWrap}>
					<div className={styles.nav}>
						<Link href={''}>독후감</Link>
						<Link href={''}>모임</Link>
						<Link href={''}>삽니다</Link>
						<Link href={''}>팝니다</Link>
					</div>
					{children}
				</div>
			</div>
		</RecoilRoot>
	);
}
