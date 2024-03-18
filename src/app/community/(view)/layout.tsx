import Nav from '@/components/community/view/Nav';
import Search from '@/components/community/view/Search';
import { BasicLayoutType } from '@/types/layoutType';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/community/layout.module.css';
import Header from '@/components/community/common/Header';
import { AllDataType } from '@/types/community/view/data';
export const metadata: Metadata = {
	title: '',
	description: '',
};

export default async function CommunityLayout({ children }: BasicLayoutType) {
	const reponse = await fetch('http://localhost:8080/popular/community', {
		cache: 'no-store',
	});
	const popularData = await reponse.json();

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

							{popularData.map((data: AllDataType, index: number) => {
								const date = new Date(data.created_at);
								const year = date.getFullYear();
								const month = ('0' + (date.getMonth() + 1)).slice(-2);
								const day = ('0' + date.getDate()).slice(-2);
								const dateString = year + '년' + month + '월' + day + '일';

								return (
									<Link href={`/community/detail/${data.doc_id}`} key={index}>
										<div className={styles.weeklyPopularContent}>
											{data.title}
										</div>
										<div className={styles.weeklyPopularInfoWrap}>
											<div className={styles.weeklyPopularWriter}>
												{data.user_name}
											</div>
											<div>{dateString}</div>
										</div>
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
