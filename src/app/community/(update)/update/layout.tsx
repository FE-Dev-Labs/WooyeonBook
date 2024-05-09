import styles from '@/styles/community/post/postLayout.module.css';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '글 수정하기 | Wooyeon.',
	description: '커뮤니티 - 글 수정 페이지입니다.',
};

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
