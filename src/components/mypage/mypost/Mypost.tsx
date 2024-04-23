import Postaccordionlayout from '@/components/common/Postaccordionlayout';
import styles from '@/styles/mypage/mypage.module.css';
import PageNation from './../../community/view/PageNation';
import MypagePageNation from './MypagePageNation';
import { useSearchParams } from 'next/navigation';
import { BookSellingDataType } from '@/types/community/view/data';

interface userIdProps {
	userId: string;
	page: string;
	sort: string;
	categories: string;
	num?: string;
}

export default async function MyPost({
	userId,
	page,
	num: pageNum,
	sort,
	categories,
}: userIdProps) {
	const response =
		page === 'likes'
			? fetch(
					`http://localhost:8080/mylike?user_id=${userId as string}&num=${pageNum || 1}`,
					{
						cache: 'no-store',
					},
				)
			: fetch(
					`http://localhost:8080/api/mypage?page=${page}&userId=${userId as string}&num=${pageNum || 1}&sort=${sort}&categories=${categories}`,
					{ cache: 'no-store' },
				);

	const data = await response.then((item) => item.json());

	const num = pageNum ? parseInt(pageNum) : 1;

	const start = (num - 1) * 4;
	const end = num * 4;

	// 우선 data가 배열인지 확인하는 코드
	const checkIsValidArray = Array.isArray(data);
	// 배열이 아니면 빈 배열을 보여준다
	const numFiltering = checkIsValidArray ? data?.slice(start, end) : [];

	return (
		<div>
			{numFiltering?.map((list: any) => (
				<div className={styles.postAccordionContainer} key={list.doc_id}>
					<div className={styles.postAccordionWrapper}>
						<Postaccordionlayout list={list} page={page} />
					</div>
				</div>
			))}
			<MypagePageNation alldata={data} />
		</div>
	);
}
