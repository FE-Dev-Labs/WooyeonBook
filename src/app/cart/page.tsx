'use client';

import styles from '@/styles/cart/cart.module.css';
import Image from 'next/image';
import { cartAtom } from '@/recoil/atom/cartAtom';
import { CartItemType } from '@/types/bookType';
import { useRecoilState } from 'recoil';
import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';

export default function cartPage() {
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);
	// 선택한 아이템 state
	const [checkedItem, setCheckedItem] = useState<string[]>([]);
	// 전체 선택 체크박스 state
	const [selectAll, setSelectAll] = useState<boolean>(false);

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

	// 아이템 체크박스를 선택하면 동작하는 함수
	const handleCheckboxClick = (isbn: string) => {
		if (checkedItem.includes(isbn)) {
			setCheckedItem(checkedItem.filter((item) => item !== isbn));
		} else {
			setCheckedItem([...checkedItem, isbn]);
		}
	};

	// 전체 아이템 체크박스를 선택하면 동작하는 함수
	const handleAllItemClick = () => {
		const isAllSelected = cart.every((item) => checkedItem.includes(item.isbn));

		if (isAllSelected) {
			setCheckedItem([]);
			// 모두 선택 해제
			setSelectAll(false);
		} else {
			const allItemIsbns = cart.map((item) => item.isbn);
			setCheckedItem(allItemIsbns);
			// 모두 선택
			setSelectAll(true);
		}
	};

	// 선택한 아이템을 삭제하는 함수
	const handleDeleteCheckedItemClick = () => {
		if (confirm('선택 상품을 장바구니에서 삭제하시겠습니까?')) {
			// 선택된 아이템을 삭제하는 로직을 실행
			setCart(cart.filter((item) => !checkedItem.includes(item.isbn)));
		}
		// 전체 선택 체크박스 해제
		setSelectAll(false);
	};

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

	return (
		<>
			<PageHeader title="장바구니" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					{/* 카트 헤더 */}
					<div className={styles.cartHeader}>
						<input
							type="checkbox"
							onChange={handleAllItemClick}
							checked={selectAll}
						/>
						<p>상품 정보</p>
						<p>정가</p>
						<p>판매가</p>
						<p>수량</p>
						<p>합계</p>
					</div>
					{/* 카트 바디 */}
					<div className={styles.cartBody}>
						{cart.map((item: CartItemType) => (
							<div key={item.isbn} className={styles.cartItem}>
								<input
									className={styles.cartBodyCheckbox}
									type="checkbox"
									checked={checkedItem.includes(item.isbn)}
									onChange={() => {
										handleCheckboxClick(item.isbn);
									}}
								/>
								<div className={styles.itemInfoWrap}>
									<Image
										src={item.cover}
										alt="cart item"
										width={80}
										height={110}
									/>
									<div className={styles.itemInfoTextWrap}>
										<p className={styles.itemTitle}>{item.title}</p>
										<p className={styles.itemAuther}>{item.author}</p>
										<p className={styles.itemPublisher}>{item.publisher}</p>
									</div>
								</div>
								<div className={styles.itemPriceStandard}>
									{item.priceStandard}원
								</div>
								<div className={styles.itemPriceSales}>{item.priceSales}원</div>
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
								<div className={styles.itemSumPrice}>
									{item.priceSales * item.quantity}원
								</div>
							</div>
						))}
					</div>
					{/* 카트 푸터 */}
					<div className={styles.cartFooter}>
						<div className={styles.buttonWrapper}>
							<button onClick={handleDeleteCheckedItemClick}>삭제</button>
						</div>
					</div>
					{/* 주문 내역 */}
					<div className={styles.orderHistoryWrap}>
						<div />
						<div className={styles.orderHistoryBody}>
							<div className={styles.orderHistoryItemNumberWrap}>
								<p>주문상품 수</p>
								<p className={styles.orderHistoryBodyText}>{totalItems}</p>
							</div>
							<div className={styles.orderHistoryItemAmountWrap}>
								<p>주문금액</p>
								<p className={styles.orderHistoryBodyText}>{totalPrice}</p>
							</div>
							<div className={styles.orderHistoryDiscountAmountWrap}>
								<p>할인금액</p>
								<p className={styles.orderHistoryBodyText}>
									{totalDiscountPrice}
								</p>
							</div>
							<div className={styles.orderHistoryDeliveryChargeWrap}>
								<div>
									<p>배송비 </p>
									<p className={styles.orderHistoryBodySubText}>
										* 15,000원 이상 구매시 무료 배송
									</p>
								</div>
								<p className={styles.orderHistoryBodyText}>{deliveryCharge}</p>
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
					{/* 결제 */}
					<div className={styles.footerBtnWrap}>
						<button>상품 추가</button>
						<button>결제</button>
					</div>
				</div>
			</div>
		</>
	);
}
