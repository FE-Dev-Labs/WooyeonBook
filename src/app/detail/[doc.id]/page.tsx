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
