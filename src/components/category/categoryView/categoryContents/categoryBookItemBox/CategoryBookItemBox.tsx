import styles from '@/styles/category/categoryView/categoryContents/catetgoryBookItemBox.tsx/categoryBookItemBox.module.css';
import BookItem from '@/components/common/bookItem/BookItem';
import BookItemSkeleton from '@/components/common/bookItem/BookItemSkeleton';
// import styles from '@/styles/category/categoryContents/categoryBookItemBox.module.css';
import { NewBookType } from '@/types/bookType';
import dynamic from 'next/dynamic';

interface CategoryBookItemBoxProp {
	data: NewBookType[];
}

const DynamicBookItem = dynamic(
	() => import('@/components/common/bookItem/BookItem'),
	{
		loading: () => <BookItemSkeleton />,
	},
);

export default function CategoryBookItemBox({ data }: CategoryBookItemBoxProp) {
	return (
		<section className={styles.categorybookItemWrapper}>
			{data?.map((book: NewBookType) => (
				<DynamicBookItem key={book.itemId} data={book} />
			))}
		</section>
	);
}
