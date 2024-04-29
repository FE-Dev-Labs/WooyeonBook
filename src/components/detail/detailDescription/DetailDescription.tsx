import styles from '@/styles/detail/detailDescription/detailDescription.module.css';
import Link from 'next/link';
import Image from 'next/image';
import { Book } from '@/types/bookDetailDate';
import DetailOrderBtn from './DetailOrderBtn';
import DetailQuantity from './DetailQuantity';
import DetailTotalQuantity from './DetailTotalQuantity';
// import DetailQuantity from './Detailquantity';
// import DetailTotalQuantity from './Detailtotalquantity';

interface bookDetailProp {
	bookInfo: Book;
}
export default function DetailDescription({ bookInfo }: bookDetailProp) {
	const modifiedCover = (cover: string) => {
		if (cover.indexOf('/coversum/') !== -1) {
			return cover.replace('/coversum/', '/cover500/');
		} else {
			return cover.replace(/\/cover(\/|200)/, '/cover500/');
		}
	};

	// 제목은 크게 - 뒤에 내용은 작게 css 주기 위한 코드
	const modifiedTitle = bookInfo.title.split('- ')[0];
	const modigiedContent = bookInfo.title.split('- ')[1];

	// 작가, 옮긴이 함수
	// 베르베르, 이현순 (지은이), 신현호, 강경호, 김성아 (옮긴이)
	const authorsText = bookInfo.author;
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
	let originalPrice = bookInfo.priceStandard;
	let discountedPrice = bookInfo.priceSales;
	// toFixed(0)를 사용하면 소수점 이하를 반올림하여 정수
	//예를 들어, 10.55.toFixed(0)은 11로 반올림되고, 9.23.toFixed(0)은 9로 반올림됩니다.
	const calculateDiscountPercentage = (
		((originalPrice - discountedPrice) / originalPrice) *
		100
	).toFixed(0);

	return (
		<>
			<div className={styles.Wrapper}>
				<div className={styles.topLeft}>
					<div className={styles.imgArea}>
						<Image
							className={styles.img}
							src={modifiedCover(bookInfo.cover)}
							alt="메인이미지"
							width={302}
							height={430}
						/>
					</div>
				</div>
				{/*제목, 저자, 옮김이, 출판소, 날짜 */}
				<div className={styles.topRigth}>
					<div className={styles.inforTop}>
						<div className={styles.titleArea}>
							<h2 className={styles.titleName}>{modifiedTitle}</h2>
							<p className={styles.titleContent}>{modigiedContent}</p>
						</div>
						<span className={styles.pubArea}>
							<span className={styles.auth}>
								<Link href={`/search?keyword=${authors}&pageNum=1`}>
									{authors}
								</Link>
								저/
								<Link href={`/search?keyword=${translators}&pageNum=1`}>
									{translators}
								</Link>
								역
							</span>
							<em className={styles.divice}></em>
							<span className={styles.pub}>
								<Link href={`/search?keyword=${bookInfo.publisher}&pageNum=1`}>
									{bookInfo.publisher}
								</Link>
							</span>
							<em className={styles.divice}></em>
							<span className={styles.date}>
								{new Date(bookInfo.pubDate).toLocaleDateString('ko-KR', {
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
							<dd>{bookInfo.priceStandard.toLocaleString()}원</dd>
						</dl>
						<dl>
							<dt>판매가</dt>
							<dd>
								<span className={styles.inforPriceSales}>
									{bookInfo.priceSales.toLocaleString()}원
								</span>
								<span className={styles.inforPersent}>
									{calculateDiscountPercentage}%
								</span>
							</dd>
						</dl>
					</div>
					{/* ISBN,중고책 */}
					<div className={styles.inforTopArea2}>
						{bookInfo.mileage > 0 && (
							<dl>
								<dt>마일리지</dt>
								<dd>{bookInfo.mileage}</dd>
							</dl>
						)}
						<dl>
							<dt className={styles.inforText}>배송비</dt>
							<dd className={styles.inforListText}>무료</dd>
						</dl>
						<dl>
							<dt className={styles.inforText}>ISBN</dt>
							<dd className={styles.inforListText}>{bookInfo.isbn}</dd>
						</dl>
						{bookInfo.subInfo.ebookList?.length > 0 && (
							<dl>
								<dt className={styles.inforText}>전자책</dt>
								<dd
									className={styles.inforEbookListLink}
									key={bookInfo.subInfo.ebookList[0].itemId}>
									<Link
										href={bookInfo.subInfo.ebookList[0].link}
										legacyBehavior>
										<a className={styles.ebookLink}>
											{bookInfo.subInfo.ebookList[0].priceSales.toLocaleString()}
											원
										</a>
									</Link>
								</dd>
							</dl>
						)}
					</div>

					{/* 수량 */}
					<div className={styles.inforTopArea3}>
						<span>수량</span>
						<DetailQuantity bookInfo={bookInfo} />
					</div>
					{/* 총 수량 */}
					<DetailTotalQuantity bookInfo={bookInfo} />
					{/* 장바구니, 구매하기 버튼 */}
					<DetailOrderBtn bookInfo={bookInfo} />
				</div>
			</div>
		</>
	);
}
