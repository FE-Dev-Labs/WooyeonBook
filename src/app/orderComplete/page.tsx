import styles from '@/styles/orderComplete/OrderCompletePage.module.css';
import Image from 'next/image';
import Img from '../../../public/orderComplete.png';
export default function OrderCompletePage() {
	return (
		<div className={styles.container}>
			<Image src={Img} alt="img" width={600} height={300} />
			<div className={styles.text}>주문이 완료되었습니다 😀</div>
			<div className={styles.btnWrap}>
				<button>홈으로 돌아가기</button>
				<button>주문 내역 확인하기</button>
			</div>
		</div>
	);
}
