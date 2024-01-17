import dynamic from 'next/dynamic';

export default function ImageSlider() {
	const Slider = dynamic(() => import('react-slick'), {
		ssr: false,
		loading: () => <p>로딩중...</p>,
	});

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
	};

	return (
		<Slider {...settings}>
			<div>
				<img src="https://via.placeholder.com/800x400" alt="image1" />
			</div>
			<div>
				<img src="https://via.placeholder.com/800x400" alt="image2" />
			</div>
			<div>
				<img src="https://via.placeholder.com/800x400" alt="image3" />
			</div>
		</Slider>
	);
}
