import styles from '@/styles/detail/detaildescription/detail.module.css';
import { ResponseData } from '@/types/bookDetailDate';
import DetailView from '@/components/detail/detailView';
// import useLocal from '@/hooks/useLocal';
// import Detailcookies from '@/components/detail/detailcomments/Detailcookies';

export default async function page({
	params,
}: {
	params: { 'doc.id': string };
}) {
	//  console.log(params)로 { 'doc.id': '9788901276533' }으로 콘솔에 찍힌다.
	// { 'doc.id': '9791168416833' }이라면, params['doc.id']는 '9791168416833'이라는 문자열을 반환
	const id = params['doc.id'];

	// 아래 방법을 쓰면 클라이언트를 선언해야되므로 cors 발생
	// const pathname = usePathname();
	// const id = params['doc.id'];

	const detailData: ResponseData = await fetch(
		`http://www.aladin.co.kr/ttb/api/ItemLookUp.aspx?ttbkey=${process.env.NEXT_PUBLIC_TTB_KEY}&itemIdType=ISBN&ItemId=${id}&output=js&Version=20131101&Cover=Big&OptResult=ebookList,usedList,subbarcode,packing`,
		{ cache: 'force-cache' },
	).then((detaildata) => {
		return detaildata.json();
	});

	// // 최근 본 상품의 id, image 변수화 해 useLocal 훅에 전달
	// const itemId = detailData.item[0].itemId;
	// const itemCover = detailData.item[0].cover;
	// useLocal({ itemId, itemCover });

	return (
		<div className={styles.container}>
			{detailData.item.map((book) => (
				<DetailView book={book} id={id} />
			))}
		</div>
	);
}
