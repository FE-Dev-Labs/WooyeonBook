import styles from '@/styles/detail/detaildata/detailexplanation.module.css';

export default function Detailexplanation({ ...book }) {
	return (
		<div className={styles.accordionWrappe}>
			<div className={styles.accordionContent}>
				<ul className={styles.accordionWrapper}>
					<div className={styles.accodionRowSelection}>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.boookItemTitle}>도서명</span>
							<span className={styles.bookItem}>{book.title}</span>
						</li>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.boookItemTitle}>지음/옮김</span>
							<span className={styles.bookItem}>{book.author}</span>
						</li>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.boookItemTitle}>주제 분류</span>
							<span className={styles.bookItem}>{book.categoryName}</span>
						</li>
					</div>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>책소개</span>
						<span className={styles.bookItem}>{book.description}</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
