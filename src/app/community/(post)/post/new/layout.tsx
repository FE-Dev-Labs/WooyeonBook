import styles from '@/styles/community/post/postLayout.module.css';
import Nav from '@/components/community/post/Nav';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: '글 쓰기 | Wooyeon.',
	description: '커뮤니티 - 글 쓰기 페이지입니다.',
};

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
