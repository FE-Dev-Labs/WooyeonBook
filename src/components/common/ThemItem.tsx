import Image, { StaticImageData } from 'next/image';
import styles from '@/styles/common/themeItem.module.css';

interface ThemItemProp {
	tag: string;
	image: StaticImageData;
	color: string;
}
export default function ThemItem({ tag, image, color }: ThemItemProp) {
	return (
		<>
			<div className={styles.themeItem} style={{ backgroundColor: color }}>
				<div className={styles.themeText}>
					<p className={styles.themeTitle}>THEME</p>
					<p className={styles.tagText}># {tag}</p>
					<p className={styles.themeRecommended}>의 추천도서</p>
				</div>
				<div className={styles.themeImage}>
					<Image src={image} alt="theme image" width={150} height={200} />
				</div>
			</div>
		</>
	);
}
