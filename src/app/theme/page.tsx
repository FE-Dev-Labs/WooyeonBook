import styles from '@/styles/theme/theme.module.css';
import PageHeader from '@/components/common/PageHeader';
import ThemItem from '@/components/common/ThemItem';
import { recommendedData } from '@/apis/theme/recommendedData';
import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '테마 추천 | Wooyeon.',
	description: '어떤 테마의 책이 있을까?',
};

export default function themePage() {
	return (
		<>
			<PageHeader title="테마추천" />
			<div className={styles.container}>
				<main className={styles.wrapper}>
					{recommendedData.map((item) => (
						<Link href={`/theme/${item.artistName}`}>
							<ThemItem
								key={item.id}
								tag={item.tag}
								image={item.image}
								color={item.color}
							/>
						</Link>
					))}
				</main>
			</div>
		</>
	);
}
