'use client';

import BookItem from '@/components/common/BookItem';
import styles from '@/styles/main/common/bookItemBox.module.css';
import { UsedBookType } from '@/types/usedBookType';
import { NewBookType } from '@/types/newBookType';

interface BookItemBoxProp {
	data: NewBookType[] | UsedBookType[];
}

export default function BookItemBox({ data }: BookItemBoxProp) {
	return (
		<div className={styles.bookItemWrapper}>
			{data?.map((book) => <BookItem key={book.itemId} data={book} />)}
		</div>
	);
}
