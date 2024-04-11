import Postaccordionlayout from '@/components/common/Postaccordionlayout';
import styles from '@/styles/mypage/mypage.module.css';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '@/utils/supabase/client';
import { getUser } from '@/apis/community/getUser';
import { AllDataType } from '@/types/community/view/data';

interface userIdProps {
	userId: string;
}
export default function MyPost({ userId }: userIdProps) {
	const params = useSearchParams();
	const page = params.get('page');
	const [postData, setPostData] = useState<[]>([]);

	// const getpostdata = async () => {
	// 	const { user_id } = await getUser();
	// 	const response = await fetch(
	// 		`http://localhost:8080/mylike?user_id=${user_id}`,
	// 	);
	// 	const responseData = await response.json();
	// 	setPostData(responseData);
	// };

	// useEffect(() => {
	// 	getpostdata();
	// }, []);

	const getpostdata = async () => {
		const response = await fetch(
			`http://localhost:8080/api/mypage?page=${page}&userId=${userId}`,
			{ cache: 'force-cache' },
		);
		const responseData = await response.json();
		setPostData(responseData);
	};

	useEffect(() => {
		getpostdata();
	}, [page, userId]);

	return (
		<>
			{postData?.map((list) => {
				return (
					<div className={styles.postAccordionContainer}>
						<div className={styles.postAccordionWrapper}>
							<Postaccordionlayout list={list} />
						</div>
					</div>
				);
			})}
		</>
	);
}
