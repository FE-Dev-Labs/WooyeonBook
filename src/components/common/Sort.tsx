import styles from '@/styles/common/sort.module.css';

interface SortProps {
	page?: string;
}

export default function Sort({ page }: SortProps) {
	return (
		<div className={styles.sortBox}>
			{page === 'search' ? (
				<div className={styles.productAmounts}>상품 (123)</div>
			) : (
				<div style={{ visibility: 'hidden' }}></div>
			)}
			<div className={styles.sortItem}>
				<div>출간일</div>
				<div>이름순</div>
				<div>판매순</div>
			</div>
		</div>
	);
}
