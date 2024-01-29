'use client';

import dynamic from 'next/dynamic';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styles from '@/styles/main/mainSlider/mainSlider.module.css';
import Image from 'next/image';
import prevArrow from '../../../../public/main/prevArrow.png';
import nextArrow from '../../../../public/main/nextArrow.png';
import SliderItem from './SliderItem';
import arrowStyles from '@/styles/main/mainSlider/customArrow.module.css';

interface ArrowProps {
	className?: string;
	style?: React.CSSProperties;
	onClick?: () => void;
}

export default function MainSlider() {
	// 슬라이더 다이나믹 라우팅 적용
	const Slider = dynamic(() => import('react-slick'), {
		ssr: false,
		loading: () => <div className={styles.container}>로딩중...</div>,
	});

	// 슬라이더 세팅에 스타일링을 위한 좌우 화살표 추가
	const CustomPrevArrow = (props: ArrowProps) => {
		const { className, onClick } = props;
		return (
			<div
				className={`${className} ${arrowStyles.arrow} ${arrowStyles.arrowPrev}`}
				onClick={onClick}>
				<Image src={prevArrow} alt="prev" width={16} height={16} />
			</div>
		);
	};
	const CustomNextArrow = (props: ArrowProps) => {
		const { className, onClick } = props;
		return (
			<div
				className={`${className} ${arrowStyles.arrow} ${arrowStyles.arrowNext}`}
				onClick={onClick}>
				<Image src={nextArrow} alt="next" width={16} height={16} />
			</div>
		);
	};

	// 슬라이더 세팅
	const settings = {
		dots: false, // 하단 dot
		infinite: true, // 슬라이더 무한 순환
		speed: 1000, // 전환 속도
		slidesToShow: 1, // 한 번에 보여지는 이미지 수
		slidesToScroll: 1, // 한 번에 넘어가는 이미지 수

		autoplay: true, // 자동으로 넘기기
		autoplaySpeed: 4000, // 자동으로 넘어가는 속도
		centerMode: true, // 현재 슬라이드를 중앙에 위치
		centerPadding: '200px', // 중앙 슬라이드 양 옆의 패딩

		prevArrow: <CustomPrevArrow />,
		nextArrow: <CustomNextArrow />,
	};

	return (
		<Slider {...settings} className={styles.container}>
			<SliderItem />
			<SliderItem />
			<SliderItem />
		</Slider>
	);
}
