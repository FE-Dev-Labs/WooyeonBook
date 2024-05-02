import styles from '@/styles/detail/detail.module.css';
import { Book, ResponseData } from '@/types/bookDetailDate';
import DetailView from '@/components/detail/DetailView';

export default async function page({
	params,
}: {
	params: { 'doc.id': string };
}) {
	const id = params['doc.id'];

	const detailData: ResponseData = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&itemIdType=ISBN&ItemId=${id}&output=js&Version=20131101&Cover=Big&OptResult=ebookList,usedList,subbarcode,packing`,
		{ next: { revalidate: 86400 } },
	).then((detaildata) => {
		return detaildata.json();
	});

	return (
		<div className={styles.container}>
			{detailData.item.map((book) => (
				<DetailView book={book} id={id} />
			))}
		</div>
	);
}

export async function generateStaticParams() {
	const res = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemList.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&QueryType=Bestseller&MaxResults=100&start=1&SearchTarget=Book&output=js&Version=20131101`,
	);
	const data = await res.json();
	const item = data.item;
	const paths = item.map((book: Book) => {
		return {
			'doc.id': book.isbn13.toString(),
		};
	});
	return paths;
}
