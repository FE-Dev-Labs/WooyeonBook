'use client';

import BookItem from '@/components/common/BookItem';
import styles from '@/styles/main/common/bookItemBox.module.css';

interface Props {
	data: any;
}

export default function BookItemBox({ data }: Props) {
	return (
		<div className={styles.bookItemWrapper}>
			{data?.item?.map((book: any) => (
				<BookItem key={book.itemId} data={book} />
			))}
		</div>
	);
}
