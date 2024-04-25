import styles from '@/styles/community/post/postLayout.module.css';
import Nav from '@/components/community/post/Nav';

export default async function PostLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={styles.container}>
			<div className={styles.viewWrap}>
				<Nav />
				{children}
			</div>
		</div>
	);
}
