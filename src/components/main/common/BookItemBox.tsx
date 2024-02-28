'use client';

import BookItem from '@/components/common/BookItem';
import styles from '@/styles/main/common/bookItemBox.module.css';
import { NewBookType, UsedBookType } from '@/types/bookType';

interface BookItemBoxProp {
	data: NewBookType[] | UsedBookType[];
}

export default function BookItemBox({ data }: BookItemBoxProp) {
	console.log(data);

	return (
		<div className={styles.bookItemWrapper}>
			{data?.map((book) => <BookItem key={book.itemId} data={book} />)}
		</div>
	);
}
