import styles from '@/styles/orderComplete/orderCompleteView/orderDetails/orderDetails.module.css';
import { CartItem } from '@/types/orderList';
import Image from 'next/image';
import Link from 'next/link';

interface OrderDetailsProp {
	order: CartItem[];
	userName: string;
}
export default function OrderDetails({ order, userName }: OrderDetailsProp) {
	return (
		<div className={styles.container}>
			<div className={styles.book}>
				<Image
					src={order[0].cover}
					alt="book image"
					width={200}
					height={300}></Image>
			</div>

			<h1>{userName}님!</h1>
			<p className={styles.text}>"{order[0].title}"</p>
			{order.length === 1 && <p>1건 주문이 완료되었습니다. 😎</p>}
			{order.length > 1 && (
				<p>외 {order.length - 1}건 주문이 완료되었습니다. 😎</p>
			)}
			<Link href="/mypage?page=bookMeeting">
				<button>마이페이지에서 주문 내역을 확인하세요!</button>
			</Link>
		</div>
	);
}
