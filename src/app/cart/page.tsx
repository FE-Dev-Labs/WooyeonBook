'use client';

import styles from '@/styles/shoppingCart/shoppingCartPage.module.css';
import Image from 'next/image';
import { cartAtom } from '@/recoil/atom/cartAtom';
import { CartItemType } from '@/types/bookType';
import { useRecoilState } from 'recoil';

export default function cartPage() {
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);

	// 아이템 수량 감소 험수
	const decreaseCount = (isbn: string) => {
		const updateCount = cart.map((item) => {
			if (item.isbn === isbn && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		setCart(updateCount);
	};

	// 아이템 수량 증가 함수
	const increaseCount = (isbn: string) => {
		const updateCount = cart.map((item) => {
			if (item.isbn === isbn) {
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCart(updateCount);
	};

	// 장바구니 내 아이템 개수 합산
	const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
	// 장바구니 내 아이템 가격 합산
	const totalPrice = cart.reduce(
		(total, item) => total + item.priceStandard * item.quantity,
		0,
	);
	// 징바구니 내 아이템 할인금액 합산
	const totalDiscountPrice = cart.reduce(
		(total, item) =>
			total + (item.priceStandard - item.priceSales) * item.quantity,
		0,
	);
	// 배송비 15,000원 미만이면 배송비 3,000원, 그 이상이면 무료
	const deliveryCharge = totalPrice >= 15000 ? 0 : 3000;
	// 장바구니 내 아이템 최종 가격
	const finalAmount = totalPrice - totalDiscountPrice + deliveryCharge;
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
				{cart.map((item: CartItemType) => (
					<div key={item.isbn} className={styles.cartBody}>
						<input className={styles.cartBodyCheckbox} type="checkbox" />
						<div className={styles.itemInfoWrap}>
							<Image
								src={item.cover}
								alt="cart item"
								width={155}
								height={200}
							/>
							<div>
								<div className={styles.itemName}>{item.title}</div>
								<div className={styles.itemWriter}>{item.author}</div>
								<div className={styles.itemTranslator}>{item.publisher}</div>
							</div>
						</div>
						<div className={styles.cartBodyPrice}>{item.priceStandard}원</div>
						<div className={styles.cartBodySellingPrice}>
							{item.priceSales}원
						</div>
						<div className={styles.quantityWrap}>
							<button
								className={styles.quantityMinusPlusBtn}
								onClick={() => {
									decreaseCount(item.isbn);
								}}>
								-
							</button>
							<div className={styles.quantity}>{item.quantity}</div>
							<button
								className={styles.quantityMinusPlusBtn}
								onClick={() => {
									increaseCount(item.isbn);
								}}>
								+
							</button>
						</div>
						<div className={styles.cartBodySumPrice}>
							{item.priceSales * item.quantity}원
						</div>
					</div>
				))}
				<hr />
				<div className={styles.cartFooter}>
					<button>선택 상품 삭제</button>
				</div>
				<hr />
				<div className={styles.orderHistoryWrap}>
					<div className={styles.orderHistoryHeader}>총 주문금액</div>
					{/* <div>asd</div> */}
					<div className={styles.orderHistoryBody}>
						<div className={styles.orderHistoryItemNumberWrap}>
							<div>주문상품 수</div>
							<div>{totalItems}</div>
						</div>
						<div className={styles.orderHistoryItemAmountWrap}>
							<div>주문금액</div>
							<div>{totalPrice}</div>
						</div>
						<div className={styles.orderHistoryDiscountAmountWrap}>
							<div>할인금액</div>
							<div>{totalDiscountPrice}</div>
						</div>
						<div className={styles.orderHistoryDeliveryChargeWrap}>
							<div>
								<div>배송비</div>
								<div className={styles.orderHistoryDeliveryChargeInfo}>
									15,000원 이상 구매시 무료 배송
								</div>
							</div>
							<div>{deliveryCharge}</div>
						</div>
						<hr className={styles.orderHistoryBodyLine} />
						<div className={styles.orderHistoryFinalPaymentAmountWrap}>
							<div className={styles.orderHistoryFinalPaymentAmountTitle}>
								최종결제금액
							</div>
							<div className={styles.orderHistoryFinalPaymentAmount}>
								<p>{finalAmount}</p>원
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
