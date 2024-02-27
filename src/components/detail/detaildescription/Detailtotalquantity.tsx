import styles from '@/styles/detail/detaildescription/detailquantity.module.css';
interface salesPriceProp {
	priceSales: string;
}

export default function Detailtotalquantity({ priceSales }: salesPriceProp) {
	return (
		<div className={styles.quantityTotalSectionWrap}>
			<span className={styles.quantityTotal}>총 상품 금액</span>
			<span className={styles.quantityTotalPrice}>{priceSales}</span>
			<span className={styles.quantityTotalWon}>원</span>
		</div>
	);
}
