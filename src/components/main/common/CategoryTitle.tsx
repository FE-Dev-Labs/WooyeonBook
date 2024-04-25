import styles from '@/styles/main/common/categoryTitle.module.css';
import Link from 'next/link';

interface CategoryTitleProps {
	mainTitle: string;
	subTitle: string;
	page?: string;
	isUsedPage?: boolean;
}

export default function CategoryTitle({
	mainTitle,
	subTitle,
	page,
	isUsedPage,
}: CategoryTitleProps) {
	return (
		<header className={styles.titleWrapper}>
			<div className={styles.titleName}>
				<h1>{mainTitle}</h1>
				<p>{subTitle}</p>
			</div>
			{!isUsedPage && (
				<Link href={`${page}`}>
					<p className={styles.seeAll}>전체보기</p>
				</Link>
			)}
		</header>
	);
}
