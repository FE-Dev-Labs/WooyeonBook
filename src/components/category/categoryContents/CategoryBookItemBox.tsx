import styles from '@/styles/category/categoryContents/categoryBookItemBox.module.css';
import { NewBookType } from '@/types/bookType';
import BookItem from '@/components/common/BookItem';
import { sortTypeState } from '@/recoil/atom/sortTypeAtom';
import { useRecoilValue } from 'recoil';

interface CategoryBookItemBoxProp {
	data: NewBookType[];
}

export default function CategoryBookItemBox({ data }: CategoryBookItemBoxProp) {
	// 소팅 state
	const sortType = useRecoilValue(sortTypeState);
	// 소팅한 data
	const sortedData = () => {
		switch (sortType) {
			case '인기순':
				return data.sort((a, b) => b.salesPoint - a.salesPoint);
			case '최신순':
				return data.sort((a, b) => {
					return new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime();
				});
			case '제목순':
				return data.sort((a, b) => a.title.localeCompare(b.title));
			default:
				return data;
		}
	};

	console.log(sortedData());

	return (
		<div className={styles.CategorybookItemWrapper}>
			{sortedData()?.map((book: any) => (
				<BookItem key={book.itemId} data={book} />
			))}
		</div>
	);
}
