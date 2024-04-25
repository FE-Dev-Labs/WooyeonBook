import styles from '@/styles/community/post/postLayout.module.css';

export default function PostLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<main className={styles.container}>
			<article className={styles.viewWrap}>{children}</article>
		</main>
	);
}
