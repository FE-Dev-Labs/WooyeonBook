import styles from '@/styles/common/bookItemWrapper.module.css';
import BookItem from '../common/BookItem';
import { NewBookType, UsedBookType } from '@/types/bookType';

interface BookItemWrapperProp {
	data: NewBookType[] | UsedBookType[];
	currentPage: number;
}

export default function BookItemWrapper({
	data,
	currentPage,
}: BookItemWrapperProp) {
	// 페이지 첫 시작 데이터의 숫자, 24 = 카테고리 페이지에 나타낼 아이템 갯수
	const startIndex = (currentPage - 1) * 30;
	// 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	const endIndex = startIndex + 30;
	// 해당 페이지에서 보여줄 데이터
	const pageData = data.slice(startIndex, endIndex);
	return (
		<div className={styles.bookItemWrapper}>
			{pageData?.map((book) => <BookItem key={book.itemId} data={book} />)}
		</div>
	);
}
