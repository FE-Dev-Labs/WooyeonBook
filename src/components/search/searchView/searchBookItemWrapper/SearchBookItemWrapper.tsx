import { NewBookType } from '@/types/bookType';
import React from 'react';
import styles from '@/styles/search/searchView/searchBookItemWrapper/searchBookItemWrapper.module.css';
import BookItem from '@/components/common/bookItem/BookItem';
import BookItemSkeleton from '@/components/common/bookItem/BookItemSkeleton';
import dynamic from 'next/dynamic';

interface SearchBookItemWrapperProp {
	data: NewBookType[];
}

const DynamicBookItem = dynamic(
	() => import('@/components/common/bookItem/BookItem'),
	{
		loading: () => <BookItemSkeleton />,
	},
);

export default function SearchBookItemWrapper({
	data,
}: SearchBookItemWrapperProp) {
	return (
		<section className={styles.searchBookItemWrapper}>
			{data?.map((book: NewBookType) => (
				<DynamicBookItem key={book.itemId} data={book} />
			))}
		</section>
	);
}
