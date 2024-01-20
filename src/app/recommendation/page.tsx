import styles from '@/styles/recommendation/recommendation.module.css';
import PageHeader from '@/components/common/pageHeader';

export default function recommendationPage() {
	return (
		<>
			<PageHeader title="추천" />
			<div className={styles.container}>
				<div className={styles.wrapper}></div>
			</div>
		</>
	);
}
