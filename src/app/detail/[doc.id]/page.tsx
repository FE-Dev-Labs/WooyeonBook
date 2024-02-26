import Detaildescription from '@/components/detail/detaildescription/Detaildescription';
import styles from '@/styles/detail/detaildescription/detail.module.css';
import Accordion from './../../../components/common/Accordion';
import Detailsustainability from '@/components/detail/detaildata/Detailsustainability';
import Detailcomment from '@/components/detail/detailcomments/Detailcomment';
import AccordionWrapper from '@/components/common/AccordionWrapper';
import { BookDataType } from '@/types/bookDateType';
import Detailinformation from '@/components/detail/detaildata/detailinformation';
import Detailexplanation from './../../../components/detail/detaildata/detailexplanation';
import {
	Book,
	Ebook,
	Packing,
	ResponseData,
	SubInfo,
	UsedList,
} from '@/types/bookDetailDate';

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

	// subInfo 정보
	// detailData.item 배열의 각 요소는 이미 Book 객체이며, subInfo 또한 객체
	// flatMap을 사용해도 subInfo 내부의 정보를 별도로 추출할 수 없다. 별로도 map을 돌려줘야된다.
	const subInfos: SubInfo[] = detailData.item.map((book) => book.subInfo);

	// usedList 정보
	const usedLists: UsedList[] = subInfos.map((subInfo) => subInfo.usedList);

	return (
		<div className={styles.container}>
			{detailData.item.map((book, index) => (
				<div key={index}>
					<Detaildescription bookInfo={book} />
					<AccordionWrapper>
						<Accordion title={'설명'} index={0}>
							<Detailexplanation bookInfo={book} />
						</Accordion>
						<Accordion title={'정보고시'} index={1}>
							<Detailinformation bookInfo={book} />
						</Accordion>
						<Accordion title={'지속가능성'} index={2}>
							<Detailsustainability bookInfo={book} />
						</Accordion>
						<Accordion title={'한줄평'} index={3}>
							<Detailcomment />
						</Accordion>
					</AccordionWrapper>
				</div>
			))}
		</div>
	);
}
