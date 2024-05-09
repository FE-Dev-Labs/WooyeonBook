import styles from '@/styles/mypage/order/orderList.module.css';
import Image from 'next/image';
import { CartItem } from '@/types/orderList';

interface orderItem {
	item: CartItem;
	getOrderList: any;
	userId: string;
}
export default function MyOderList({ item }: orderItem) {
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
			</div>
		</>
	);
}
