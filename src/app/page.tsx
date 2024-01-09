import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>main page</div>
		</main>
	);
}
