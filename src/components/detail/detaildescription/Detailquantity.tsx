import styles from '@/styles/detail/detaildescription/detailquantity.module.css';

export default function Detailquantity() {
	return (
		<div className={styles.quantitySelectionWrap}>
			<div className={styles.quantityimgArea}>
				<img
					className={styles.quantityMinusImg}
					src={'/detail/BsDashCircle.png'}
				/>
				<input className={styles.quantityInput} />

				<img
					className={styles.quantityPlusImg}
					src={'/detail/BsPlusCircle.png'}
				/>
			</div>
		</div>
	);
}
