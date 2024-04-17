import styles from '@/styles/theme/artist/themeHeader.module.css';
import Image, { StaticImageData } from 'next/image';

interface ThemeHeaderProps {
	title: string;
}

export default function ThemeHeader({ title }: ThemeHeaderProps) {
	return (
		<header className={styles.themeHeader}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}># {title}의 추천 도서</div>
			</div>
		</header>
	);
}
``;
