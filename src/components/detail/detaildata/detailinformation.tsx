'use client';
import { AccordionContext } from '@/components/common/AccordionWrapper';
import styles from '@/styles/detail/detaildata/detailinformation.module.css';
import { useContext } from 'react';
export default function Detailinformation({ ...book }) {
	
	const { active } = useContext(AccordionContext);

	return (
		<div className={styles.accordionContent}>
			<ul className={active.includes(1) ? styles.accordionWrappeActive : ''}>
				<div className={styles.accodionRowSelection}>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>출간일</span>
						<span className={styles.bookItem}>{book.pubDate}</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>출판사</span>
						<span className={styles.bookItem}>{book.publisher}</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>읽는 순서</span>
						<span className={styles.bookItem}>{book.startIndex}</span>
					</li>
				</div>
				<div className={styles.accodionRowSelection}>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>ISBN</span>
						<span className={styles.bookItem}>{book.isbn}</span>
					</li>

					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>크기</span>
						<span className={styles.bookItem}>
							{book.packing.sizeWidth}*{book.packing.sizeHeight}mm
						</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>쪽수</span>
						<span className={styles.bookItem}>{book.itemPage}</span>
					</li>
				</div>
				<div className={styles.accodionRowSelection}>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.boookItemTitle}>판형</span>
						<span className={styles.bookItem}>{book.packing.styleDesc}</span>
					</li>
				</div>
			</ul>
		</div>
	);
}
