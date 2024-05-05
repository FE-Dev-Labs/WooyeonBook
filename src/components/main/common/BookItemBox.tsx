'use client';

import BookItemSkeleton from '@/components/common/bookItem/BookItemSkeleton';
import styles from '@/styles/main/common/bookItemBox.module.css';
import { NewBookType, UsedBookType } from '@/types/bookType';
import dynamic from 'next/dynamic';

interface BookItemBoxProp {
	data: NewBookType[] | UsedBookType[];
}

const DynamicBookItem = dynamic(
	() => import('@/components/common/bookItem/BookItem'),
	{
		loading: () => <BookItemSkeleton />,
	},
);

export default function BookItemBox({ data }: BookItemBoxProp) {
	return (
		<div className={styles.bookItemWrapper}>
			{data?.map((book) => <DynamicBookItem key={book.itemId} data={book} />)}
		</div>
	);
}
