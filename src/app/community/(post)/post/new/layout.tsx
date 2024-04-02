import type { BasicLayoutType } from '@/types/layoutType';
import styles from '@/styles/community/post/PostLayout.module.css';
import Nav from '@/components/community/post/Nav';

export default function PostLayout({ children }: BasicLayoutType) {
	return (
		<div className={styles.container}>
			<div className={styles.viewWrap}>
				<Nav />
				{children}
			</div>
		</div>
	);
}
