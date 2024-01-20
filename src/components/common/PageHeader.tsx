import styles from '@/styles/common/pageHeader.module.css';

interface PageHeaderProps {
	title: string;
}
export default function pageHeader({ title }: PageHeaderProps) {
	return (
		<header className={styles.pageHeader}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}>{title}</div>
			</div>
		</header>
	);
}
