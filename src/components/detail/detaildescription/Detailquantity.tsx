import styles from '@/styles/detail/detaildescription/detailquantity.module.css';
import Image from 'next/image';
import minus from '../../../../public/detail/BsDashCircle.png';
import pluse from '../../../../public/detail/BsPlusCircle.png';

export default function Detailquantity() {
	return (
		<div className={styles.quantitySelectionWrap}>
			<div className={styles.quantityimgArea}>
				<Image
					className={styles.quantityMinusImg}
					alt="Minus"
					src={minus}
					width={20}
					height={20}
				/>
				<input className={styles.quantityInput} />

				<Image
					className={styles.quantityPlusImg}
					alt="Pluse"
					src={pluse}
					width={20}
					height={20}
				/>
			</div>

			<div className={styles.quantityTotalSectionWrap}>
				<span className={styles.quantityTotal}>총 상품 금액</span>
				<span className={styles.quantityTotalPrice}>30,600원</span>
			</div>
		</div>
	);
}
