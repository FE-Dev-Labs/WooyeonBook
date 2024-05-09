'use client';
import styles from '@/styles/community/update/update.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useInputState } from '@/hooks/useInputState';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { useRouter } from 'next/navigation';
import UpdateOptionBookMeeting from '../UpdateOptionBookMeeting';
import { BookMeetingDataType } from '@/types/community/view/data';
import { getUser } from '@/apis/community/getUser';
import LoadingSpinner from '@/components/common/LoadingSpinner';

interface UpdateProps {
	data?: BookMeetingDataType;
	docid: string;
}

const EditorComponent = dynamic(
	() => import('@/components/community/common/UpdateEdior'),
	{
		ssr: false,
		loading: () => (
			<div
				style={{
					width: '1300px',
					height: '601.25px',
					backgroundColor: '#a5a5a5',
					borderRadius: '5px',
				}}></div>
		),
	},
);

function BookMeetingUpdate({ data, docid }: UpdateProps) {
	const router = useRouter();
	const [loading, setLoading] = useState<boolean>(false);
	const title = useInputState('');
	const [text, setText] = useRecoilState(editorText);
	const [contentArr, setContentArr] = useRecoilState(editorImgArr);
	const chatUrl = useInputState('');
	const deadline = useInputState(new Date());
	const [state, setState] = useState<boolean>(false);
	const [recruitmentNumber, setRecruitmentNumber] = useState<number>(0);
	const onchangeRecruitmentNumber = (e: any) => {
		setRecruitmentNumber(e.value);
	};
	const view = data?.view;
	const like = data?.like;

	const goback = () => {
		return router.back();
	};

	useEffect(() => {
		if (!data) return;
		title.onChangeValue(data.title);
		setText(data.content);
		setContentArr(data.content_img_url as string[]);
		chatUrl.onChangeValue(data.chatting_url);
		setRecruitmentNumber(data.recruitment_number);
		deadline.onChangeValue(data.deadline);
		setState(data.state);
	}, []);

	const onSubmit = async () => {
		setLoading(true);
		const { user_id, user_name } = await getUser();

		const data = {
			doc_id: docid,
			created_at: new Date(),
			created_user: user_id as string,
			title: title.value as string,
			content: text,
			content_img_url: contentArr,
			user_name: user_name as string,
			state: state,
			recruitment_number: recruitmentNumber,
			deadline: deadline.value,
			field: 'bookMeeting',
			category: 'bookMeeting',
			view: view,
			like: like,
			chatting_url: chatUrl.value,
		};
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/update/bookMeeting/${docid}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		).catch((err) => {
			throw new Error(err);
		});
		// state 초기화
		title.init('');
		setText('');
		setContentArr([]);
		chatUrl.init('');
		deadline.init(new Date());
		setRecruitmentNumber(0);
		setState(false);
		setLoading(false);

		return router.push(`/community/detail/bookMeeting/${docid}`);
	};
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className={styles.container}>
					<div className={styles.header}>
						<div>📚</div>
						<h2>모임을 만들어 보세요.</h2>
					</div>
					<input
						type="text"
						className={styles.title}
						placeholder={data?.title}
						onChange={title.onChange}
					/>
					<UpdateOptionBookMeeting
						data={data}
						chatUrl={
							chatUrl as {
								value: string;
								onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
							}
						}
						deadline={
							deadline as {
								value: Date;
								onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
							}
						}
						onchangeRecruitmentNumber={onchangeRecruitmentNumber}
					/>
					<div>
						<EditorComponent data={data} />
					</div>
					<div className={styles.BtnWrap}>
						<button onClick={goback} className={styles.cancelBtn}>
							취소
						</button>
						<button onClick={onSubmit} className={styles.submitBtn}>
							등록
						</button>
					</div>
				</div>
			)}
		</>
	);
}

export default BookMeetingUpdate;
