'use client';
import type { BasicLayoutType } from '@/types/layoutType';
import Nav from '@/components/community/common/post/Nav';
import Title from '@/components/community/common/post/Title';
import styles from '@/styles/community/post/PostLayout.module.css';

export default function PostLayout({ children }: BasicLayoutType) {
	return (
		<div className={styles.container}>
			<Nav />
			<Title />
			{children}
		</div>
	);
}
