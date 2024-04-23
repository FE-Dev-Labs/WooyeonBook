import styles from '@/styles/category/categoryContents/categorySlider/sliderItem.module.css';
import Image from 'next/image';
import bookImage from '../../../../../public/main/book1.jpg';

export default function SliderItem() {
	return (
		<div className={styles.sliderItem}>
			<div className={styles.imageBox}>
				<div className={styles.bookImage}>
					<Image src={bookImage} alt="slider image" width={150} height={220} />
				</div>
				<div className={styles.bookImage}>
					<Image src={bookImage} alt="slider image" width={150} height={220} />
				</div>
				<div className={styles.bookImage}>
					<Image src={bookImage} alt="slider image" width={150} height={220} />
				</div>
			</div>
			<div className={styles.textBox}>API 확인 후 텍스트가 들어갈 공간</div>
		</div>
	);
}
