import styles from '@/styles/orderComplete/OrderCompletePage.module.css';
import Image from 'next/image';
import Img from '../../../public/orderComplete.png';
import Link from 'next/link';
export default function OrderCompletePage() {
	return (
		<div className={styles.container}>
			<Image src={Img} alt="img" width={400} height={200} />
			<div className={styles.orderCompleteWrapper}>
				<p>주문이 완료되었습니다. 😎</p>
				<Link href={'/mypage?page=bookMeeting'}>
					<p>마이페이지에서 주문 내역을 확인하세요!</p>
				</Link>
			</div>
		</div>
	);
}
