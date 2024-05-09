import { cartAtom } from '@/recoil/atom/cartAtom';
import styles from '@/styles/cart/cartView/orderHistory/orderHistory.module.css';
import { CartItemType } from '@/types/bookType';
import { useRecoilValue } from 'recoil';

interface OrderHistoryProp {
	checkedItem: string[];
}

export default function OrderHistory({ checkedItem }: OrderHistoryProp) {
	// 카트 아이템 state
	const cart = useRecoilValue<CartItemType[]>(cartAtom);

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

	return (
		<div className={styles.orderHistoryWrap}>
			<div />
			<div className={styles.orderHistoryBody}>
				<div className={styles.orderHistoryItemNumberWrap}>
					<p>주문상품 수</p>
					<p className={styles.orderHistoryBodyText}>{totalItems}</p>
				</div>
				<div className={styles.orderHistoryItemAmountWrap}>
					<p>주문금액</p>
					<p className={styles.orderHistoryBodyText}>
						{totalPrice.toLocaleString()}
					</p>
				</div>
				<div className={styles.orderHistoryDiscountAmountWrap}>
					<p>할인금액</p>
					<p className={styles.orderHistoryBodyText}>
						{totalDiscountPrice.toLocaleString()}
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
						<p>{finalAmount.toLocaleString()}</p>원
					</div>
				</div>
			</div>
		</div>
	);
}
