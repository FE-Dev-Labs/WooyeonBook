import styles from '@/styles/main/common/categoryTitle.module.css';
import Link from 'next/link';

interface TitleProps {
	mainTitle: string;
	subTitle: string;
}

export default function CategoryTitle({ mainTitle, subTitle }: TitleProps) {
	return (
		<div className={styles.titleWrapper}>
			<div className={styles.titleName}>
				<h1>{mainTitle}</h1>
				<p>{subTitle}</p>
			</div>
			<Link href="/">
				<p className={styles.seeAll}>전체보기</p>
			</Link>
		</div>
	);
}
