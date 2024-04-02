'use client';

import styles from '@/styles/cart/cart.module.css';
import Image from 'next/image';
import { cartAtom } from '@/recoil/atom/cartAtom';
import { CartItemType } from '@/types/bookType';
import { useRecoilState } from 'recoil';
import { useEffect, useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getUser } from '@/apis/community/getUser';
import { useUser } from '@/hooks/useUser';

export default function cartPage() {
	// useRouter 호출
	const router = useRouter();
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);
	// 선택한 아이템 state
	const [checkedItem, setCheckedItem] = useState(() =>
		cart.map((item) => item.isbn),
	);
	// useUser에서 호출한 로그인 상태
	const user = useUser();

	// 전체 선택 체크박스 state
	const [selectAll, setSelectAll] = useState<boolean>(true);

	// 체크된 아이템들만 필터링하는 함수
	const checkedCartItems = cart.filter((item) =>
		checkedItem.includes(item.isbn),
	);

	//장바구니 내 체크된 아이템 개수 합산
	const totalItems = checkedCartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);
	// 장바구니 내 체크된 아이템 가격 합산
	const totalPrice = checkedCartItems.reduce(
		(total, item) => total + item.priceStandard * item.quantity,
		0,
	);
	// 징바구니 내 체크된 아이템 할인금액 합산
	const totalDiscountPrice = checkedCartItems.reduce(
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
	const handleDecreaseCountClick = (isbn: string) => {
		// 아이템 수량 1 초과일 경우 quantity -1
		const updateCount = cart.map((item) => {
			if (item.isbn === isbn && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		setCart(updateCount);
	};

	const handleIncreaseCountClick = (isbn: string) => {
		// 아이템 수량 quantity +1
		const updateCount = cart.map((item) => {
			if (item.isbn === isbn) {
				// 중고책인 경우 1개 이상 수량 증가 못하게 alert 후 함수 종료
				if (item.mallType === 'USED') {
					alert('중고 도서는 수량 조절이 불가능합니다.');
					return item;
				}
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCart(updateCount);
	};

	// 주문하기 버튼 클릭 시 동작하는 함수
	const handleOrderButtonClick = () => {
		// 로그인 상태가 아닐 경우
		if (!user) {
			if (confirm('로그인이 필요한 서비스입니다 로그인 하시겠습니까?')) {
				// 로그인 페이지로 이동
				router.push('/login');
				// 취소 시 함수 종료
				return;
			}
		}
		// 체크된 아이템이 없을 경우
		if (checkedItem.length === 0) {
			alert('주문할 상품을 선택해주세요.');
			return; // 함수를 여기서 종료
		}
		// 주문 확인
		if (confirm('상품을 주문하시겠습니까?')) {
			// cart 초기화
			setCart([]);
			// 주문 완료 페이지로 이동
			router.push('/orderComplete');
		}
	};

	return (
		<>
			<PageHeader title="장바구니" />
			{cart.length > 0 ? (
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
								<div key={item?.isbn} className={styles.cartItem}>
									<input
										className={styles.cartBodyCheckbox}
										type="checkbox"
										checked={checkedItem.includes(item?.isbn)}
										onChange={() => {
											handleCheckboxClick(item?.isbn);
										}}
									/>
									<div className={styles.itemInfoWrap}>
										<Link
											href={`/detail/${item?.isbn}?type=${
												item?.mallType === 'USED' ? 'used' : 'new'
											}`}>
											<Image
												src={item?.cover}
												alt="cart item"
												width={80}
												height={110}
											/>
										</Link>

										<div className={styles.itemInfoTextWrap}>
											<Link
												href={`/detail/${item?.isbn}?type=${
													item?.mallType === 'USED' ? 'used' : 'new'
												}`}>
												<p className={styles.itemTitle}>{item?.title}</p>
											</Link>

											<p className={styles.itemAuther}>{item?.author}</p>
											<p className={styles.itemPublisher}>{item?.publisher}</p>
										</div>
									</div>
									<div className={styles.itemPriceStandard}>
										{item?.priceStandard}원
									</div>
									<div className={styles.itemPriceSales}>
										{item?.priceSales}원
									</div>
									<div className={styles.quantityWrap}>
										<button
											className={styles.quantityMinusPlusBtn}
											onClick={() => {
												handleDecreaseCountClick(item?.isbn);
											}}>
											-
										</button>
										<div className={styles.quantity}>{item?.quantity}</div>
										<button
											className={styles.quantityMinusPlusBtn}
											onClick={() => {
												handleIncreaseCountClick(item?.isbn);
											}}>
											+
										</button>
									</div>
									<div className={styles.itemSumPrice}>
										{item?.priceSales * item?.quantity}원
									</div>
								</div>
							))}
						</div>
						{/* 카트 푸터 */}
						<div className={styles.cartFooter}>
							<div className={styles.cartDeleteBtn}>
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
									<p className={styles.orderHistoryBodyText}>
										{deliveryCharge}
									</p>
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
							<Link href={'/'}>
								<button>상품 추가</button>
							</Link>
							<button onClick={handleOrderButtonClick}>결제하기</button>
						</div>
					</div>
				</div>
			) : (
				// 장바구니가 비었을 떄
				<div className={styles.emptyCartWrapper}>
					<div>장바구니가 비어있습니다.</div>
					<Link href={'/'}>
						<button>상품 구경하러 가기</button>
					</Link>
				</div>
			)}
		</>
	);
}
