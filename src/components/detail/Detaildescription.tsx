import styles from '@/styles/detail/detaildescription.module.css';
import Link from 'next/link';
import Detailquantity from './Detailquantity';
import Detailtotalquantity from './Detailtotalquantity';

export default function Detaildescription() {
	// bookInfo 객체
	const bookInfo = [
		{
			id: '1',
			title: '베르베르씨, 오늘은 뭘 쓰세요?',
			author: '베르베르, 이현순 (지은이), 신현호, 강경아, 김성아 (옮긴이)',
			publisher: '웅진하우스',
			pubDate: '2024-01-11',
			priceStandard: 17000,
			priceSales: 15300,
			mileage: 300,
			delivery: 3000,
			isbn: 'K762937852',
			cover: '/detail/bookImage.jpg',
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

	// 작가, 옮긴이 함수
	// 베르베르, 이현순 (지은이), 신현호, 강경호, 김성아 (옮긴이)
	const authorsText = bookInfo[0].author;
	// [베르베르, 이현순], [신현호,강경호,김성아 (옮긴이)]
	const [authorsPart, translatorsPart] = authorsText.split(' (지은이), ');

	// [베르베르, 이현순]
	const authors = authorsPart.includes(', ')
		? authorsPart.split(', ').join(',')
		: [authorsPart];

	let translators: any = [];
	if (translatorsPart) {
		const translatorsText = translatorsPart.split(' (옮긴이)')[0];
		translators = translatorsText.includes(', ')
			? translatorsText.split(', ').join(',')
			: [translatorsText];
	}

	// 할인 퍼센트 함수
	let originalPrice = bookInfo[0].priceStandard;
	let discountedPrice = bookInfo[0].priceSales;
	// toFixed(0)를 사용하면 소수점 이하를 반올림하여 정수
	//예를 들어, 10.55.toFixed(0)은 11로 반올림되고, 9.23.toFixed(0)은 9로 반올림됩니다.
	const calculateDiscountPercentage = (
		((originalPrice - discountedPrice) / originalPrice) *
		100
	).toFixed(0);

	return (
		<>
			{bookInfo.map((item) => (
				<>
					<div className={styles.Wrapper} key={item.id}>
						<div className={styles.topLeft}>
							<div className={styles.imgArea}>
								<img className={styles.img} src={item.cover} alt="메인이미지" />
							</div>
						</div>
						{/*제목, 저자, 옮김이, 출판소, 날짜 */}
						<div className={styles.topRigth}>
							<div className={styles.inforTop}>
								<div className={styles.titleArea}>
									<h2 className={styles.titleName}>{item.title}</h2>
								</div>
								<span className={styles.pubArea}>
									<span className={styles.auth}>
										<Link href={'/'}>{authors}</Link>
										저/
										<Link href={'/'}>{translators}</Link>역
									</span>
									<em className={styles.divice}></em>
									<span className={styles.pub}>
										<Link href={'/'}>{item.publisher}</Link>
									</span>
									<em className={styles.divice}></em>
									<span className={styles.date}>
										{new Date(item.pubDate).toLocaleDateString('ko-KR', {
											year: 'numeric',
											month: 'long',
											day: 'numeric',
										})}
									</span>
								</span>
							</div>
							{/* 책 가격*/}
							<div className={styles.inforTopArea}>
								<dl>
									<dt>정가</dt>
									<dd>{item.priceStandard.toLocaleString()}원</dd>
								</dl>
								<dl>
									<dt>판매가</dt>
									<dd>
										<span className={styles.inforPriceSales}>
											{item.priceSales.toLocaleString()}원
										</span>
										<span className={styles.inforPersent}>
											{calculateDiscountPercentage}%
										</span>
									</dd>
								</dl>
							</div>
							{/* ISBN,중고책 */}
							<div className={styles.inforTopArea2}>
								<dl>
									<dt>마일리지</dt>
									<dd>{item.mileage}</dd>
								</dl>
								<dl>
									<dt className={styles.inforText}>배송비</dt>
									<dd className={styles.inforListText}>
										{item.delivery.toLocaleString()}원
									</dd>
								</dl>
								<dl>
									<dt className={styles.inforText}>ISBN</dt>
									<dd className={styles.inforListText}>{item.isbn}</dd>
								</dl>
								<dl>
									<dt className={styles.inforText}>전자책</dt>
									{item.subInfo.ebookList.map((ebook) => {
										return (
											<dd
												className={styles.inforEbookListLink}
												key={ebook.itemId}>
												<Link href={ebook.link}>
													{ebook.priceSales.toLocaleString()}원
												</Link>
											</dd>
										);
									})}
								</dl>
							</div>
							{/* 수량 */}
							<div className={styles.inforTopArea3}>
								<span>수량</span>
								<Detailquantity />
							</div>
							{/* 총 수량 */}
							<Detailtotalquantity />
						</div>
					</div>
				</>
			))}
		</>
	);
}
