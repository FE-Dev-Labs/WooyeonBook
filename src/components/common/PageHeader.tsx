import styles from '@/styles/common/pageHeader.module.css';

interface PageHeaderProps {
	title: string;
	isTheme?: boolean;
}
export default function PageHeader({ title, isTheme }: PageHeaderProps) {
	return (
		<header className={styles.pageHeader}>
			<div className={styles.titleWrapper}>
				{!isTheme && <div className={styles.title}>{title}</div>}
				{isTheme && <div className={styles.title}># {title}의 추천 도서</div>}
			</div>
		</header>
	);
}
