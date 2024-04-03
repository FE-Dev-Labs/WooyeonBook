import styles from '@/styles/theme/artist/themeHeader.module.css';
import Image, { StaticImageData } from 'next/image';

interface ThemeHeaderProps {
	title: string;
	color: string;
	image: StaticImageData;
}

export default function ThemeHeader({ title, color, image }: ThemeHeaderProps) {
	return (
		<header className={styles.themeHeader}>
			<div className={styles.titleWrapper}>
				<div className={styles.title}># {title}의 추천 도서</div>
				{/* <div className={styles.artistImage}> */}
				{/* <Image src={image} alt="theme image" width={400} height={300} /> */}
				{/* </div> */}
			</div>
		</header>
	);
}
