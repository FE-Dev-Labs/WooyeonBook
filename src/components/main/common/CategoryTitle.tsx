import styles from '@/styles/main/common/categoryTitle.module.css';
import Link from 'next/link';

interface CategoryTitleProps {
	mainTitle: string;
	subTitle: string;
	page?: string;
}

export default function CategoryTitle({
	mainTitle,
	subTitle,
	page,
}: CategoryTitleProps) {
	return (
		<div className={styles.titleWrapper}>
			<div className={styles.titleName}>
				<h1>{mainTitle}</h1>
				<p>{subTitle}</p>
			</div>
			{page !== 'used' && (
				<Link href="/">
					<p className={styles.seeAll}>전체보기</p>
				</Link>
			)}
		</div>
	);
}
