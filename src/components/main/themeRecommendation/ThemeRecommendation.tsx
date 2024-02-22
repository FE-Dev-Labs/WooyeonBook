import styles from '@/styles/main/themeRecommendation/themeRecommendation.module.css';
import CategoryTitle from '../common/CategoryTitle';
import ThemItem from '@/components/common/ThemItem';

interface Props {
	data: any;
}

export default function ThemeRecommendation({ data }: any) {
	return (
		<div className={styles.themeRecommendationWrapper}>
			<CategoryTitle
				mainTitle="테마추천"
				subTitle="어떤 테마의 책이 있을까? "
				page="theme"
			/>
			<div className={styles.themeItemWrapper}>
				<ThemItem />
				<ThemItem />
				<ThemItem />
				<ThemItem />
				<ThemItem />
				<ThemItem />
			</div>
		</div>
	);
}
