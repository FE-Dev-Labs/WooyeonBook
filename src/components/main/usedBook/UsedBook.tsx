import styles from '@/styles/main/usedBook/usedBook.module.css';
import CategoryTitle from '../common/CategoryTitle';
import BookItemBox from '../common/BookItemBox';

export default function UsedBook() {
	return (
		<div className={styles.usedBookWrapper}>
			<CategoryTitle
				mainTitle="중고도서"
				subTitle="지구를 위해 중고도서 어떠세요?"
				page="used"
			/>
			<BookItemBox />
		</div>
	);
}
