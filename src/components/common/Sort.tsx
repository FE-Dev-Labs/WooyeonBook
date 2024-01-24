import styles from '@/styles/common/sort.module.css';

export default function Sort() {
	return (
		<div className={styles.sortBox}>
			<div className={styles.productAmounts}>상품 (123)</div>
			<div className={styles.sortItem}>
				<div>인기순</div>
				<div>30</div>
			</div>
		</div>
	);
}
