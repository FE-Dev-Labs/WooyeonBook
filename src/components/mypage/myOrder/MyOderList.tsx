import styles from '@/styles/mypage/order/orderList.module.css';
import Image from 'next/image';
import { CartItem } from '@/types/orderList';
import { createClient } from '@/utils/supabase/client';

interface orderItem {
	item: CartItem;
	getOrderList: any;
	userId: string;
}
export default function MyOderList({ item, getOrderList, userId }: orderItem) {
	console.log(userId);
	const supabase = createClient();
	const handleorderDelete = () => {};
	// 주문 삭제하기
	// const handleorderDelete = async () => {
	// 	const yes = confirm('주문을 삭제하시겠습니까?');
	// 	if (yes) {
	// 		try {
	// 			const { data, error } = await supabase
	// 				.from('orderList')
	// 				.select('*')
	// 				.eq('user_id', userId);
	// 			if (error) {
	// 				console.log(error);
	// 			} else {
	// 				data.forEach(async (item) => {
	// 					// 현재 유저의 주문 내역
	// 					let orderCart = item.cart;
	// 					// 현재 유저의 주문 내역의 cart 정보
	// 					orderCart.forEach((item: any) => {
	// 						item.cart;
	// 					});
	// 					const filterCartItems = orderCart.filter(
	// 						(list: any) => list.useid !== userId,
	// 					);
	// 					const { error } = await supabase
	// 						.from('orderList')
	// 						.update({ cart: filterCartItems })
	// 						.eq('user_id', userId);
	// 					if (error) {
	// 						console.log(error);
	// 					}
	// 					getOrderList();
	// 				});
	// 			}
	// 		} catch (error) {
	// 			console.log(error);
	// 		}
	// 	}
	// };

	return (
		<>
			<div className={styles.orderWrapper}>
				<div className={styles.orderNumber}>
					<span>{item.id + 1}</span>
				</div>
				<div className={styles.orderImgArea}>
					<Image
						className={styles.orderImg}
						src={item.cover}
						alt="메인이미지"
						width={200}
						height={200}
					/>

					<div className={styles.orderdataWrapper}>
						<h3 className={styles.orderTitle}>{item.title}</h3>

						<div className={styles.orderFooter}>
							<div className={styles.orderIconWrapper}>
								<span>{item.author}</span>
							</div>
						</div>
					</div>
				</div>
				<span className={styles.orderPriceStand}>
					{item.priceStandard.toLocaleString()}원
				</span>
				<span className={styles.orderPriceSales}>
					{item.priceSales.toLocaleString()}원
				</span>
				<span className={styles.orderQuantity}>{item.quantity}개</span>
				<span className={styles.orderTotoalPrice}>
					{item.itemTotalPrice.toLocaleString()}원
				</span>
				{/* <button className={styles.orderCancleBtn} onClick={handleorderDelete}>
					주문취소
				</button> */}
			</div>
		</>
	);
}
