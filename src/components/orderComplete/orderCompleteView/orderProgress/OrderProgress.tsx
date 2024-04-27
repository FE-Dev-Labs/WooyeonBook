import styles from '@/styles/orderComplete/orderCompleteView/orderProgress/orderProgress.module.css';
import Image from 'next/image';
import orderCompleteImage from '@/assets/orderComplete/orderComplete.png';

export default function OrderProgress() {
	return (
		<div className={styles.container}>
			<Image
				src={orderCompleteImage}
				alt="order complete image"
				width={500}
				height={400}
				priority={true}
			/>
			<p>주문이 진행중입니다. 😎</p>
		</div>
	);
}
