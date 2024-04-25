import styles from '@/styles/orderComplete/orderComplete.module.css';
import Image from 'next/image';
import orderCompleteImage from '@/assets/orderComplete/orderCompleteImage.png';
import TextWrapper from '@/components/orderComplete/TextWrapper';

export default function OrderCompletePage() {
	return (
		<div className={styles.container}>
			<main className={styles.wrapper}>
				<Image
					src={orderCompleteImage}
					alt="order complete image"
					width={400}
					height={200}
					priority={true}
				/>
				<TextWrapper />
			</main>
		</div>
	);
}
