import Category from '@/components/best/Category';
import PageHeader from '@/components/common/PageHeader';
import styles from '@/styles/best/best.module.css';

export default function bestPage() {
	return (
		<>
			<PageHeader title="베스트셀러" />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					<Category />
					<div className={styles.sortBox}>
						<div className={styles.productAmounts}>상품 (123)</div>
						<div className={styles.sortItem}>
							<div>인기순</div>
							<div>30</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
