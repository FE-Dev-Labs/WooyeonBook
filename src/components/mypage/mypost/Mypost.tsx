'use client';

import Postaccordionlayout from '@/components/common/Postaccordionlayout';
import styles from '@/styles/mypage/mypage.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { AllDataType } from '@/types/community/view/data';
import { getUser } from '@/apis/community/getUser';

interface userIdProps {
	userId: string;
}

export default function MyPost({ userId }: userIdProps) {
	const params = useSearchParams();
	const page = params.get('page');
	const [postData, setPostData] = useState<AllDataType[]>([]);
	const [likeData, setLikeData] = useState<AllDataType[]>([]);

	// const getpagepostdata = async () => {
	// 	const response = await fetch(
	// 		`http://localhost:8080/api/mypage?page=${page}&userId=${userId as string}`,
	// 	);
	// 	const responseData = await response.json();
	// 	setPostData(responseData);
	// };

	// const getlikepostdata = async () => {
	// 	const response = await fetch(
	// 		`http://localhost:8080/mylike?user_id=${userId as string}`,
	// 	);
	// 	const responseData = await response.json();
	// 	setLikeData(responseData);
	// };
	const getData = async () => {
		if (page !== 'likes') {
			const response = await fetch(
				`http://localhost:8080/api/mypage?page=${page}&userId=${userId as string}`,
			);
			const data = await response.json();
			setPostData(data);
		} else {
			const response = await fetch(
				`http://localhost:8080/mylike?user_id=${userId as string}`,
			);
			const data = await response.json();
			setLikeData(data);
		}
	};

	useEffect(() => {
		getData();
	}, [userId, page]);

	return (
		<div>
			{page !== 'likes'
				? postData?.map((list) => (
						<div className={styles.postAccordionContainer} key={list.doc_id}>
							<div className={styles.postAccordionWrapper}>
								<Postaccordionlayout list={list} />
							</div>
						</div>
					))
				: likeData?.map((list) => (
						<div className={styles.postAccordionContainer} key={list.doc_id}>
							<div className={styles.postAccordionWrapper}>
								<Postaccordionlayout list={list} />
							</div>
						</div>
					))}
		</div>
	);
}
