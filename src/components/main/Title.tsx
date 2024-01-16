import styles from '@/styles/main/common/title.module.css';

interface TitleProps {
	mainTitle: string;
	subTitle: string;
}

export default function Title({ mainTitle, subTitle }: TitleProps) {
	return (
		<div className={styles.titleWrapper}>
			<div className={styles.titleName}>
				<h1>{mainTitle}</h1>
				<p>{subTitle}</p>
			</div>
			<div>
				<p className={styles.seeAll}>전체보기</p>
			</div>
		</div>
	);
}
