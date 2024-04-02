import type { BasicLayoutType } from '@/types/layoutType';
import styles from '@/styles/community/post/PostLayout.module.css';

export default function PostLayout({ children }: BasicLayoutType) {
	return (
		<main className={styles.container}>
			<article className={styles.viewWrap}>{children}</article>
		</main>
	);
}
