import styles from '@/styles/common/bookItem/bookItemWrapper.module.css';
import { NewBookType, UsedBookType } from '@/types/bookType';
import dynamic from 'next/dynamic';
import BookItemSkeleton from './BookItemSkeleton';

interface BookItemWrapperProp {
	data: NewBookType[] | UsedBookType[];
	page?: string;
}

const DynamicBookItem = dynamic(
	() => import('@/components/common/bookItem/BookItem'),
	{
		loading: () => <BookItemSkeleton />,
	},
);

export default function BookItemWrapper({ data, page }: BookItemWrapperProp) {
	const wrapperClassName =
		page === 'category'
			? styles.categoryBookItemWrapper
			: styles.bookItemWrapper;
	return (
		<div className={wrapperClassName}>
			{data?.map((book) => <DynamicBookItem key={book.itemId} data={book} />)}
		</div>
	);
}
