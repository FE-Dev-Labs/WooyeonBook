import styles from '@/styles/main/usedBook/usedBook.module.css';
import CategoryTitle from '../common/CategoryTitle';
import BookItemBox from '../common/BookItemBox';
import { UsedBookType } from '@/types/usedBookType';

interface UsedBookProp {
	data: UsedBookType[];
}
export default function UsedBook({ data }: UsedBookProp) {
	return (
		<div className={styles.usedBookWrapper}>
			<CategoryTitle
				mainTitle="중고도서"
				subTitle="지구를 위해 중고도서 어떠세요?"
				page="used"
			/>
			<BookItemBox data={data} />
		</div>
	);
}
