import Detaildescription from '@/components/detail/detaildescription/Detaildescription';
import styles from '@/styles/detail/detaildescription/detail.module.css';
import Accordion from './../../../components/common/Accordion';
import Detailcomment from '@/components/detail/detailcomments/Detailcomment';
import AccordionWrapper from '@/components/common/AccordionWrapper';
import Detailinformation from '@/components/detail/detaildata/detailinformation';
import Detailexplanation from './../../../components/detail/detaildata/detailexplanation';
import { ResponseData } from '@/types/bookDetailDate';
import Detailsustainability from '@/components/detail/detaildata/detailsustainability';
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
							{/* <Detailcookies /> */}
							<Detailcomment bookId={id} />
						</Accordion>
					</AccordionWrapper>
				</div>
			))}
		</div>
	);
}
