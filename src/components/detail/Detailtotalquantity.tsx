import styles from '@/styles/detail/detailquantity.module.css';
export default function Detailtotalquantity() {
	return (
		<div className={styles.quantityTotalSectionWrap}>
			<span className={styles.quantityTotal}>총 상품 금액</span>
			<span className={styles.quantityTotalPrice}>30,600원</span>
		</div>
	);
}
