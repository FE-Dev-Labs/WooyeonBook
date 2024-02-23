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
				<span>출간일</span>
				<span>이름순</span>
				<span>판매순</span>
			</div>
		</div>
	);
}
