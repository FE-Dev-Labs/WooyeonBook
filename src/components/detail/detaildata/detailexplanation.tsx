import styles from '@/styles/detail/detaildata/detailexplanation.module.css';
import { Book } from '@/types/bookDetailDate';

interface bookDetailProp {
	bookInfo: Book;
}
export default function Detailexplanation({ bookInfo }: bookDetailProp) {
	return (
		<div className={styles.accordionWrappe}>
			<div className={styles.accordionContent}>
				<ul className={styles.accordionWrapper}>
					<div className={styles.accodionRowSelection}>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.boookItemTitle}>도서명</span>
							<span className={styles.bookItem}>{bookInfo.title}</span>
						</li>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.boookItemTitle}>지음/옮김</span>
							<span className={styles.bookItem}>{bookInfo.author}</span>
						</li>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.boookItemTitle}>주제 분류</span>
							<span className={styles.bookItem}>{bookInfo.categoryName}</span>
						</li>
					</div>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>책소개</span>
						<span className={styles.bookItem}>{bookInfo.description}</span>
					</li>
				</ul>
			</div>
		</div>
	);
}
