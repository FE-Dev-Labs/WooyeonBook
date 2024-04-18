import Postaccordionlayout from '@/components/common/Postaccordionlayout';
import styles from '@/styles/mypage/mypage.module.css';
import PageNation from './../../community/view/PageNation';
import MypagePageNation from './MypagePageNation';

interface userIdProps {
	userId: string;
	page: string;
	num?: string;
}

export default async function MyPost({ userId, page, num }: userIdProps) {
	const response =
		page === 'likes'
			? fetch(
					`http://localhost:8080/mylike?user_id=${userId as string}&num=${num || 1}`,
					{
						cache: 'no-store',
					},
				)
			: fetch(
					`http://localhost:8080/api/mypage?page=${page}&userId=${userId as string}&num=${num || 1}`,
					{ cache: 'no-store' },
				);
	// let response = undefined;

	// switch (page) {
	// 	case 'likes':
	// 		response = fetch(
	// 			`http://localhost:8080/mylike?user_id=${userId as string}`,
	// 			{ cache: 'no-store' },
	// 		);
	// 		break;

	// 	default:
	// 		response = fetch(
	// 			`http://localhost:8080/api/mypage?page=${page}&userId=${userId as string}`,
	// 			{ cache: 'no-store' },
	// 		);
	// }

	const { data, sliceData } = await response.then((item) => item.json());

	return (
		<div>
			{sliceData?.map((list: any) => (
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
