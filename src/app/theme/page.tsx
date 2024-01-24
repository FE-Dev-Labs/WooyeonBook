import styles from '@/styles/theme/theme.module.css';
import PageHeader from '@/components/common/PageHeader';
import ThemItem from '@/components/common/ThemItem';

export default function themePage() {
	return (
		<>
			<PageHeader title="테마추천" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
					<ThemItem />
				</div>
			</div>
		</>
	);
}
