import Nav from '@/components/community/view/nav/Nav';
import Search from '@/components/community/view/Search';
import type { Metadata } from 'next';
import Link from 'next/link';
import styles from '@/styles/community/viewLayout.module.css';
import Header from '@/components/community/common/Header';
import { AllDataType } from '@/types/community/view/data';
import Image from 'next/image';
import userLogoIcon from '@/assets/community/userLogoIcon.png';

export const metadata: Metadata = {
	title: '커뮤니티 | Wooyeon.',
	description: 'Discover Books, Build Community',
};
async function fetchData() {
	let retryCount = 0;
	const maxRetries = 3;

	while (retryCount < maxRetries) {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/view/popularList`,

				{
					cache: 'no-store',
				},
			);
			if (response.ok) {
				const data = await response.json();
				return data;
			} else {
				throw new Error(
					`Fetch request failed with status code ${response.status}`,
				);
			}
		} catch (error) {
			console.error(
				`Fetch request failed. Retrying... (Attempt ${retryCount + 1}/${maxRetries})`,
				error,
			);
			retryCount++;
			await new Promise((resolve) => setTimeout(resolve, 1000)); // 1초 대기 후 재시도
		}
	}

	throw new Error('Maximum number of retries reached. Unable to fetch data.');
}
export default async function CommunityViewLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const popularData = await fetchData();

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
											<Image
												src={userLogoIcon}
												alt="img"
												width={16}
												height={16}
												className={styles.userLogo}
											/>
											<span className={styles.userName}>{data.user_name}</span>
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
