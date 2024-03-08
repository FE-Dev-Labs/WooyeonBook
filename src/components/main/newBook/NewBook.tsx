import styles from '@/styles/main/newBook/newBook.module.css';
import CategoryTitle from '../common/CategoryTitle';
import BookItemBox from '../common/BookItemBox';
import { NewBookType } from '@/types/bookType';

interface newBookBoxProp {
	data: NewBookType[];
}

export default function newBookBox({ data }: newBookBoxProp) {
	return (
		<div className={styles.newBookWrapper}>
			<CategoryTitle
				mainTitle="신간도서"
				subTitle="새로 나온 책 뭐가 있지?"
				page="new"
			/>
			<BookItemBox data={data} />
		</div>
	);
}
