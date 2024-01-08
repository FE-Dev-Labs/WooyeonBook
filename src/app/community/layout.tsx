import ControlPanel from '@/components/community/common/ControlPanel';
import Nav from '@/components/community/common/Nav';
import Search from '@/components/community/common/Search';
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
			<div className={styles.contentWrap}>
				<Nav />
				<Search />
				<ControlPanel />
				<hr />
				{children}
			</div>
			<div className={styles.popularContentWrap}>
				<h3>인기글</h3>
				<Link href={''}>
					<div>내용</div>
					<div>
						<div>작성자</div>
						<div>작성일</div>
					</div>
				</Link>
			</div>
		</div>
	);
}
