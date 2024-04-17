import Postaccordionlayout from '@/components/common/Postaccordionlayout';
import styles from '@/styles/mypage/mypage.module.css';
import { AllDataType } from '@/types/community/view/data';

interface userIdProps {
	userId: string;
	page: string;
}

export default async function MyPost({ userId, page }: userIdProps) {
	// const response =
	// 	page === 'likes'
	// 		? fetch(`http://localhost:8080/mylike?user_id=${userId as string}`, {
	// 				cache: 'no-store',
	// 			})
	// 		: fetch(
	// 				`http://localhost:8080/api/mypage?page=${page}&userId=${userId as string}`,
	// 				{ cache: 'no-store' },
	// 			);
	let response = undefined;

	switch (page) {
		case 'likes':
			response = fetch(
				`http://localhost:8080/mylike?user_id=${userId as string}`,
				{ cache: 'no-store' },
			);
			break;

		default:
			response = fetch(
				`http://localhost:8080/api/mypage?page=${page}&userId=${userId as string}`,
				{ cache: 'no-store' },
			);
	}

	const data = await response.then((item) => item.json());

	return (
		<div>
			{data?.map((list: any) => (
				<div className={styles.postAccordionContainer} key={list.doc_id}>
					<div className={styles.postAccordionWrapper}>
						<Postaccordionlayout list={list} />
					</div>
				</div>
			))}
			{/* {page !== 'likes'
				? data?.map((list: any) => (
						<div className={styles.postAccordionContainer} key={list.doc_id}>
							<div className={styles.postAccordionWrapper}>
								<Postaccordionlayout list={list} />
							</div>
						</div>
					))
				: data?.map((list: any) => (
						<div className={styles.postAccordionContainer} key={list.doc_id}>
							<div className={styles.postAccordionWrapper}>
								<Postaccordionlayout list={list} />
							</div>
						</div>
					))} */}
		</div>
	);
}
