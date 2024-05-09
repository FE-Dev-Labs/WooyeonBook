import styles from '@/styles/detail/detail.module.css';
import { ResponseData } from '@/types/bookDetailDate';
import DetailView from '@/components/detail/DetailView';
import { Metadata } from 'next';

interface DetailPageProp {
	params: {
		docId: string;
	};
}

export async function generateMetadata({
	params,
}: DetailPageProp): Promise<Metadata> {
	const id = params.docId;
	const detailData: ResponseData = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&itemIdType=ISBN&ItemId=${id}&output=js&Version=20131101&Cover=Big&OptResult=ebookList,usedList,subbarcode,packing`,
		{ next: { revalidate: 86400 } },
	).then((detaildata) => {
		return detaildata.json();
	});
	const title = detailData?.item?.[0]?.title;
	return {
		title: `${title} | Wooyeon.`,
		description: `'${title}' 도서의 상세 페이지입니다.`,
	};
}

export default async function detailPage({ params }: DetailPageProp) {
	const id = params.docId;
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
