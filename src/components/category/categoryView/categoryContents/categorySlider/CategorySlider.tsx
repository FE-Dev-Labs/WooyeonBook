'use client';

import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/category/categoryContents/categorySlider/categorySlider.module.css';
import prevArrow from '../../../../../public/common/arrowLeft.png';
import nextArrow from '../../../../../public/common/arrowRight.png';
import Image from 'next/image';
import arrowStyles from '@/styles/category/categoryContents/categorySlider/customArrow.module.css';
import SliderItem from './SliderItem';

interface ArrowProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

export default function CategorySlider() {
	// 슬라이더 다이나믹 라우팅 적용
	const CategorySlider = dynamic(() => import('react-slick'), {
		ssr: false,
		loading: () => (
			<div className={styles.categorySliderWrapper}>로딩중...</div>
		),
	});
	// 슬라이더 세팅에 스타일링을 위한 좌우 화살표 추가
	const CustomPrevArrow = (props: ArrowProps) => {
		const { className, onClick } = props;
		return (
			<div
				className={`${className} ${arrowStyles.arrow} ${arrowStyles.arrowPrev}`}
				onClick={onClick}>
				<Image src={prevArrow} alt="prev" width={14} height={14} />
			</div>
		);
	};
	const CustomNextArrow = (props: ArrowProps) => {
		const { className, onClick } = props;
		return (
			<div
				className={`${className} ${arrowStyles.arrow} ${arrowStyles.arrowNext}`}
				onClick={onClick}>
				<Image src={nextArrow} alt="next" width={14} height={14} />
			</div>
		);
	};

	// 슬라이더 세팅
	const settings = {
		dots: false,
		infinite: true,
		speed: 1000,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 5000,

		prevArrow: <CustomPrevArrow />,
		nextArrow: <CustomNextArrow />,
	};

	return (
		<CategorySlider {...settings} className={styles.categorySliderWrapper}>
			<SliderItem />
			<SliderItem />
			<SliderItem />
		</CategorySlider>
	);
}
