'use client';
import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/main/mainSlider/sliderItem.module.css';

interface BookSliderItem {
	item: any;
}
export default function SliderItem({ item }: BookSliderItem) {
	return (
		<Link href="/" className={styles.customSliderItem}>
			<div
				className={styles.sliderItem}
				style={{ backgroundColor: item.background }}>
				<Image
					src={item.img}
					alt="book image"
					width={224}
					height={330}
					className={styles.sliderImg}
				/>
			</div>

			<div className={styles.sliderTitleWrap}>
				<p className={styles.sliderCategory}>{item.category}</p>
				<p className={styles.sliderTitle}>{item.title}</p>
				<p className={styles.sliderTitle2}>{item.title2}</p>
				<p className={styles.sliderContent}>{item.content}</p>
			</div>
		</Link>
	);
}
