import ControlPanel from '@/components/community/common/view/ControlPanel';
import Nav from '@/components/community/common/view/Nav';
import Search from '@/components/community/common/view/Search';
import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/community/layout.module.css';
export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function CommunityLayout({ children }: BasicLayoutType) {
	return (
		<div className={styles.container}>
			<div></div>
			<div className={styles.contentWrap}>
				<Nav />
				<Search />
				<ControlPanel />
				<hr className={styles.line} />
				{children}
			</div>
			<div className={styles.popularContentWrap}>
				<h3>인기글</h3>
				<Link href={''}>
					<div className={styles.popularContent}>
						내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용
					</div>
					<div className={styles.popularContentInfoWrap}>
						<div>작성자</div>
						<div className={styles.dot}>●</div>
						<div>작성일</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
