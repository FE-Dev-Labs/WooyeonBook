import Nav from '@/components/community/view/Nav';
import Search from '@/components/community/view/Search';
import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/community/layout.module.css';
import Header from '@/components/community/common/Header';
export const metadata: Metadata = {
	title: '',
	description: '',
};

export default function CommunityLayout({ children }: BasicLayoutType) {
	const popularData = [1, 2, 3, 4];
	return (
		<>
			<Header />
			<div className={styles.container}>
				{/* 왼쪽 광고 영역 */}
				<div></div>
				<div className={styles.mainWrap}>
					<div className={styles.contentWrap}>
						<Nav />
						<Search />
						<hr className={styles.line} />
						{children}
					</div>

					<div className={styles.weeklyPopularWrap}>
						<div>
							<h3>주간 인기글</h3>
							<Link href={``}>
								<div className={styles.weeklyPopularContent}>
									aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
								</div>
								<div className={styles.weeklyPopularWriter}>작성자</div>
							</Link>
							{popularData.map((data, index) => {
								return (
									<Link href={``} key={index}>
										<div className={styles.weeklyPopularContent}>
											aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
										</div>
										<div className={styles.weeklyPopularWriter}>작성자</div>
									</Link>
								);
							})}
						</div>
					</div>
				</div>
				{/* 오른쪽 광고 영역 */}
				<div></div>
			</div>
		</>
	);
}
