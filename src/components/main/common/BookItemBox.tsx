'use client';

import BookItem from '@/components/common/BookItem';
import styles from '@/styles/main/common/bookItemBox.module.css';

interface BookItemBoxProp {
	newBookData?: any;
}

export default function BookItemBox({ newBookData }: BookItemBoxProp) {
	return (
		<div className={styles.bookItemWrapper}>
			{newBookData &&
				newBookData.item?.map((book: any) => (
					<BookItem key={book.itemId} newBookData={book} />
				))}
		</div>
	);
}
