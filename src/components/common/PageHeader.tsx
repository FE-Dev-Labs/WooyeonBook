import styles from '@/styles/common/PageHeader.module.css';

interface PageHeaderProps {
	title: string;
}
export default function PageHeader({ title }: PageHeaderProps) {
	return (
		<header className={styles.pageHeader}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}>{title}</div>
			</div>
		</header>
	);
}
