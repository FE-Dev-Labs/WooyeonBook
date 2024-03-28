import { NewBookType } from '@/types/bookType';
import React from 'react';
import BookItem from '../common/BookItem';
import styles from '@/styles/search/searchBookItemWrapper.module.css';

interface SearchBookItemWrapperProp {
	data: NewBookType[];
}

export default function SearchBookItemWrapper({
	data,
}: SearchBookItemWrapperProp) {
	return (
		<div className={styles.searchBookItemWrapper}>
			{data?.map((book: NewBookType) => (
				<BookItem key={book.itemId} data={book} />
			))}
		</div>
	);
}
