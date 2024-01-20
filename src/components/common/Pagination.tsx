import styles from '@/styles/common/pagination.module.css';
import Image from 'next/image';
import arrowRightIcon from '../../../public/common/arrowRight.png';
import arrowDoubleRightIcon from '../../../public/common/arrowDoubleRight.png';

export default function Pagination() {
	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.paginationBox}>
				<div className={styles.paginationItem}>1</div>
				<div className={styles.paginationItem}>2</div>
				<div className={styles.paginationItem}>3</div>
				<div className={styles.paginationItem}>4</div>
				<div className={styles.paginationItem}>5</div>
				<div className={styles.paginationItem}>6</div>
				<div className={styles.paginationItem}>7</div>
				<div className={styles.paginationItem}>8</div>
				<div className={styles.paginationItem}>9</div>
				<div className={styles.paginationItem}>10</div>
				<div className={styles.paginationItem}>
					<Image src={arrowRightIcon} alt="arrow" />
				</div>
				<div className={styles.paginationItem}>
					<Image src={arrowDoubleRightIcon} alt="arrow" />
				</div>
			</div>
		</div>
	);
}
