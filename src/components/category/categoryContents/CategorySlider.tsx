'use client';

import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/category/categoryContents/categorySlider.module.css';

export default function CategorySlider() {
	// 슬라이더 다이나믹 라우팅 적용
	const CategorySlider = dynamic(() => import('react-slick'), {
		ssr: false,
		loading: () => (
			<div className={styles.categorySliderWrapper}>로딩중...</div>
		),
	});

	// 슬라이더 세팅
	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 4000,
	};

	return (
		<CategorySlider {...settings} className={styles.categorySliderWrapper}>
			<div className={styles.sliderItem}>
				<div>이미지</div>
				<div>텍스트</div>
			</div>
			<div>2</div>
			<div>3</div>
		</CategorySlider>
	);
}
