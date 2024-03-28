'use client';

import styles from '@/styles/shoppingCart/shoppingCartPage.module.css';
import Image from 'next/image';
import bookImg from '../../../public/book.png';
import { cartAtom } from '@/recoil/atom/cartAtom';
import { CartItemType } from '@/types/bookType';
import { useRecoilState } from 'recoil';
export default function cartPage() {
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);

	console.log(cart);

	return (
		<div className={styles.container}>
			<header>
				<h1>장바구니</h1>
			</header>
			<div>
				<hr />
				<div className={styles.cartHeader}>
					<input type="checkbox" />
					<div>상품 정보</div>
					<div>정가</div>
					<div>판매가</div>
					<div>수량</div>
					<div>합계</div>
				</div>
				<hr />
				<div className={styles.cartBody}>
					<input className={styles.cartBodyCheckbox} type="checkbox" />
					<div className={styles.itemInfoWrap}>
						<Image src={bookImg} alt="" width={155} height={200} />
						<div>
							<div className={styles.itemName}>상품명</div>
							<div className={styles.itemWriter}>글쓴이</div>
							<div className={styles.itemTranslator}>옮긴이</div>
						</div>
					</div>
					<div className={styles.cartBodyPrice}>정가</div>
					<div className={styles.cartBodySellingPrice}>판매가</div>
					<div className={styles.quantityWrap}>
						<button className={styles.quantityMinusPlusBtn}>-</button>
						<div className={styles.quantity}>0</div>
						<button className={styles.quantityMinusPlusBtn}>+</button>
					</div>
					<div className={styles.cartBodySumPrice}>합계</div>
				</div>
				<hr />
				<div className={styles.cartFooter}>
					<button>선택 상품 삭제</button>
				</div>
				<hr />
				<div className={styles.orderHistoryWrap}>
					<div className={styles.orderHistoryHeader}>총 주문금액</div>
					<div className={styles.orderHistoryBody}>
						<div className={styles.orderHistoryItemNumberWrap}>
							<div>주문상품 수</div>
							<div>0</div>
						</div>
						<div className={styles.orderHistoryItemAmountWrap}>
							<div>주문금액</div>
							<div>0</div>
						</div>
						<div className={styles.orderHistoryDiscountAmountWrap}>
							<div>할인금액</div>
							<div>0</div>
						</div>
						<div className={styles.orderHistoryDeliveryChargeWrap}>
							<div>
								<div>배송비</div>
								<div className={styles.orderHistoryDeliveryChargeInfo}>
									15,000원 이상 구매시 무료 배송
								</div>
							</div>
							<div>0</div>
						</div>
						<hr className={styles.orderHistoryBodyLine} />
						<div className={styles.orderHistoryFinalPaymentAmountWrap}>
							<div className={styles.orderHistoryFinalPaymentAmountTitle}>
								최종결제금액
							</div>
							<div className={styles.orderHistoryFinalPaymentAmount}>
								<p>34,000</p>원
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className={styles.footerBtnWrap}>
				<button>상품 추가</button>
				<button>결제하기</button>
			</div>
		</div>
	);
}
