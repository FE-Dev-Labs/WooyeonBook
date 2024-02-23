import BookItemWrapper from '@/components/common/BookItemWrapper';
import Category from '@/components/common/Category';
import PageHeader from '@/components/common/PageHeader';
import Pagination from '@/components/common/Pagination';
import Sort from '@/components/common/Sort';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/new/new.module.css';
import { NewBookType, RootNewBookType } from '@/types/newBookType';

export default async function newPage() {
	// 신간도서 페이지에 뿌려줄 신간 리스트
	const newBookData: RootNewBookType = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=ItemNewSpecial&MaxResults=30&start=1&SearchTarget=Book&output=js&Version=20131101&Cover=Big`,
		{ cache: 'force-cache' },
	).then((data) => {
		return data.json();
	});
	// 신간리스트의 item만 추출해 newItem에 할당
	const newItem: NewBookType[] = newBookData?.item?.flatMap((book) => book);

	console.log(newItem);

	return (
		<>
			<PageHeader title="신간도서" />
			<div className={styles.container}>
				<div />
				<div className={styles.wrapper}>
					<Category />
					<Sort />
					<BookItemWrapper data={newItem} />
					<Pagination />
				</div>
				<div>
					<RecentlyViewedBooks />
				</div>
			</div>
		</>
	);
}
