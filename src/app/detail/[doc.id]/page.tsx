import Accordionlayout from '@/components/common/Accordionlayout';
import Detaildescription from '@/components/detail/detaildescription/Detaildescription';
import styles from '@/styles/detail/detaildescription/detail.module.css';
export default function page() {
	const bookInfo = [
		{
			id: '1',
			title: '베르베르씨, 오늘은 뭘 쓰세요?',
			author: '베르베르, 이현순 (지은이), 신현호, 강경아, 김성아 (옮긴이)',
			publisher: '웅진하우스',
			startIndex: '1',
			description:
				'뉴욕 메트로폴리탄 미술관에서 경비원으로 근무했던 패트릭 브링리의 독특하면서도 지적인 회고를 담은 에세이다. 가족의 죽음으로 고통 속에 웅크리고 있던 한 남자가 미술관에서 10년이라는 시간을 보내며 상실감을 극복하고 마침내 세상으로 나아갈 힘을 얻는 여정을 섬세하게 그려냈다.',
			pubDate: '2024-01-11',
			priceStandard: 17000,
			priceSales: 15300,
			mileage: 300,
			delivery: 3000,
			isbn: 'K762937852',
			cover: '/detail/bookImage.jpg',
			categoryName: '국내도서>에세이>외국에세이',
			itemPage: 360,
			packing: {
				styleDesc: '반양장본',
				weight: 468,
				sizeDepth: 20,
				sizeHeight: 210,
				sizeWidth: 135,
			},
			usedList: {
				aladinUsed: {
					itemCount: 0,
					minPrice: 0,
					link: 'https://www.aladin.co.kr/shop/UsedShop/wuseditemall.aspx?ItemId=328923887&amp;TabType=2&amp;partner=openAPI',
				},
			},
			subInfo: {
				ebookList: [
					{
						itemId: 330696256,
						isbn: 'E652532410',
						isbn13: '9788901277455',
						priceSales: 12200,
						link: 'https://www.aladin.co.kr/shop/wproduct.aspx?ItemId=330696256&amp;partner=openAPI',
					},
				],
			},
		},
	];

	return (
		<div className={styles.container}>
			{bookInfo.map((book, index) => (
				<div key={index}>
					<Detaildescription bookInfo={book} />
					<Accordionlayout {...book} isMypage={false} />
				</div>
			))}
		</div>
	);
}
