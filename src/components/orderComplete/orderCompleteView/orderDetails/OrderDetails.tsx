import styles from '@/styles/orderComplete/orderCompleteView/orderDetails/orderDetails.module.css';
import { CartItem } from '@/types/orderList';
import Image from 'next/image';
import Link from 'next/link';

interface OrderDetailsProp {
	userName: string;
	order: CartItem[];
	orderId: string;
}
export default function OrderDetails({
	userName,
	order,
	orderId,
}: OrderDetailsProp) {
	return (
		<div className={styles.container}>
			<div className={styles.order}>
				<h1>주문 완료</h1>
				<div className={styles.textWrapper}>
					<h1>{userName}님! 주문이 완료되었습니다.</h1>
					<p>주문번호: {orderId}</p>
				</div>
				<div className={styles.imageWrapper}>
					<Image
						className={styles.img}
						src={order[0]?.cover}
						alt="book image"
						width={150}
						height={200}
					/>
					<div className={styles.imgTitle}>
						{order.length === 1 && (
							<h1 className={styles.imgTitle}>{order[0]?.title}</h1>
						)}
						{order.length > 1 && (
							<h1 className={styles.imgTitle}>
								{order[0]?.title} 外 {order.length - 1}건
							</h1>
						)}
					</div>
				</div>
				<div className={styles.buttonWrapper}>
					<Link href="/mypage?page=bookReport">
						<button>주문 상세보기</button>
					</Link>
					<Link href="/">
						<button>계속 쇼핑하기</button>
					</Link>
				</div>
			</div>
		</div>
	);
}
