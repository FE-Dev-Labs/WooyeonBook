import styles from '@/styles/main/themeRecommendation/themeRecommendation.module.css';
import CategoryTitle from '../common/CategoryTitle';
import ThemItem from '@/components/common/ThemItem';
import { recommendedData } from '@/apis/theme/recommendedData';
import Link from 'next/link';

export default function ThemeRecommendation() {
	return (
		<div className={styles.themeRecommendationWrapper}>
			<CategoryTitle
				mainTitle="테마추천"
				subTitle="어떤 테마의 책이 있을까? "
				page="theme"
			/>
			<div className={styles.themeItemWrapper}>
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
			</div>
		</div>
	);
}
