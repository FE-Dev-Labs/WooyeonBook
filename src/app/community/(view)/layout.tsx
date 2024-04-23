import Nav from '@/components/community/view/nav/Nav';
import Search from '@/components/community/view/Search';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/community/ViewLayout.module.css';
import Header from '@/components/community/common/Header';
import { AllDataType } from '@/types/community/view/data';
import { getDate } from '@/utils/getDate';

export const metadata: Metadata = {
	title: '',
	description: '',
};

export default async function CommunityViewLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const reponse = await fetch('http://localhost:8080/popular/community', {
		cache: 'no-store',
	});
	const popularData = await reponse.json();

	return (
		<main>
			<Header />
			<div className={styles.container}>
				{/* 왼쪽 광고 영역 */}
				<aside></aside>
				<div className={styles.mainWrap}>
					<article className={styles.contentWrap}>
						<Nav />
						<Search />
						<div className={styles.line}></div>
						{children}
					</article>

					<aside className={styles.weeklyPopularWrap}>
						<div>
							<h3>주간 인기글</h3>

							{popularData.map((data: AllDataType) => {
								return (
									<Link
										href={`/community/detail/${data.field as string}/${data.doc_id as string}`}
										key={data.doc_id}>
										<div className={styles.weeklyPopularContent}>
											{data.title}
										</div>
										<div className={styles.weeklyPopularWriter}>
											🌱 {data.user_name}
										</div>
									</Link>
								);
							})}
						</div>
					</aside>
				</div>
				{/* 오른쪽 광고 영역 */}
				<aside></aside>
			</div>
		</main>
	);
}
