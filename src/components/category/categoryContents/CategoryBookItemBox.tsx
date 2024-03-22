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
	const sortedData =
		// 제목순일 때의 sort
		sortType === '제목순'
			? [...data].sort((a, b) => a.title.localeCompare(b.title))
			: // 제목순이 아닐 떄의 sort(최신순). 비교군이 2가지라서 삼항연산자로 만들어 놓음
				[...data].sort(
					(a, b) =>
						new Date(b.pubDate).getTime() - new Date(a.pubDate).getTime(),
				);

	return (
		<div className={styles.CategorybookItemWrapper}>
			{sortedData?.map((book: NewBookType) => (
				<BookItem key={book.itemId} data={book} />
			))}
		</div>
	);
}
