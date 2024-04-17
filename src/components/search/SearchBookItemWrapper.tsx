import { NewBookType } from '@/types/bookType';
import React from 'react';
import styles from '@/styles/search/searchBookItemWrapper.module.css';
import BookItem from '../common/bookItem/BookItem';

interface SearchBookItemWrapperProp {
	data: NewBookType[];
}

export default function SearchBookItemWrapper({
	data,
}: SearchBookItemWrapperProp) {
	return (
		<section className={styles.searchBookItemWrapper}>
			{data?.map((book: NewBookType) => (
				<BookItem key={book.itemId} data={book} />
			))}
		</section>
	);
}
