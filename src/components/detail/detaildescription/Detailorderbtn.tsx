import styles from '@/styles/detail/detaildescription/detailorderbtn.module.css';
export default function Detailorderbtn() {
	return (
		<div className={styles.btnWrapper}>
			<button className={styles.addToCartBtn}>장바구니 담기</button>
			<button className={styles.orderBtn}>주문하기</button>
		</div>
	);
}
