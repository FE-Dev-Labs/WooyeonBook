import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/main/mainSlider/sliderItem.module.css';
import bookImage from '../../../../public/main/book1.jpg';

export default function SliderItem() {
	return (
		<Link href="/">
			<div className={styles.sliderItem}>
				<Image src={bookImage} alt="book image" />
			</div>
		</Link>
	);
}
