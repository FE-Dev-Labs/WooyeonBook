import type { BasicLayoutType } from '@/types/layoutType';
import styles from '@/styles/community/post/PostLayout.module.css';
import Link from 'next/link';

export default function PostLayout({ children }: BasicLayoutType) {
	return (
		<div className={styles.container}>
			<div className={styles.viewWrap}>
				<div className={styles.nav}>
					<Link href={'/community/post/new/bookReport'}>독후감</Link>
					<Link href={'/community/post/new/bookMeeting'}>모임</Link>
					<Link href={'/community/post/new/bookBuying'}>삽니다</Link>
					<Link href={'/community/post/new/bookSelling'}>팝니다</Link>
				</div>
				{children}
			</div>
		</div>
	);
}
