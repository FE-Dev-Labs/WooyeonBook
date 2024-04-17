'use client';

import { itemAmountAtom } from '@/recoil/atom/itemAmountAtom';
// import styles from '@/styles/detail/detaildescription/detailquantity.module.css';
import styles from '@/styles/detail/detailDescription/detailQuantity.module.css';
import { Book } from '@/types/bookDetailDate';
import { useRecoilState, useRecoilValue } from 'recoil';
interface bookDetailProp {
	bookInfo: Book;
}
export default function DetailTotalQuantity({ bookInfo }: bookDetailProp) {
	// 장바구니 수량 state
	const count = useRecoilValue<number>(itemAmountAtom);

	// 전체 금액
	const totalPrice = (count * bookInfo.priceSales).toLocaleString();

	return (
		<div className={styles.quantityTotalSectionWrap}>
			<span className={styles.quantityTotal}>총 상품 금액</span>
			<span className={styles.quantityTotalPrice}>{totalPrice}</span>
			<span className={styles.quantityTotalWon}>원</span>
		</div>
	);
}
// const totalPrice =
// 	typeof count === 'number'
// 		? (count * bookInfo.priceSales).toLocaleString()
// 		: '';
