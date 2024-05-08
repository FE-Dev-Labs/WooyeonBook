'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/styles/community/post/postNewPage.module.css';
import { useInputState } from '@/hooks/useInputState';
import { useRecoilState } from 'recoil';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { BookMeetingPostDataType } from '@/types/community/post/data';
import OptionBookMeeting from '@/components/community/post/option/OptionBookMeeting';
import { useEffect, useState } from 'react';
import { getUser } from '@/apis/community/getUser';

const EditorComponent = dynamic(
	() => import('@/components/community/common/WysiwygEditor'),
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

const BookMeetingPostPage = () => {
	const router = useRouter();
	const params = usePathname();

	const goback = () => router.back();

	// 뒤로가기, 새로고침 방지
	const preventClose = (e: BeforeUnloadEvent) => {
		e.preventDefault();
		e.returnValue = ''; //Chrome에서 동작하도록; deprecated
	};

	useEffect(() => {
		window.addEventListener('beforeunload', preventClose);
		return () => {
			window.removeEventListener('beforeunload', preventClose);
		};
	}, []);

	// 현제 페이지 url
	const page = params.split('/')[4];
	// title
	const title = useInputState('');
	// text / img url arr
	const [content, setContent] = useRecoilState(editorText);
	const [imgArr, setImgArr] = useRecoilState(editorImgArr);
	// 모집중 / 모집 완료 state
	const [state, setState] = useState<boolean>(false);
	// 모집 마감일
	const deadline = useInputState(new Date());
	// kakao chat url state
	const chatUrl = useInputState('');
	// 모집 인원 state
	const [recruitmentNumber, setRecruitmentNumber] = useState<number>(0);
	const onchangeRecruitmentNumber = (e: any) => {
		setRecruitmentNumber(e.value);
	};
	const onSubmit = async () => {
		const { user_id, user_name } = await getUser();
		const data: BookMeetingPostDataType = {
			created_at: new Date(),
			created_user: user_id as string,
			title: title.value as string,
			content: content,
			content_img_url: imgArr,
			user_name: user_name as string,
			field: page,
			view: 0,
			like: 0,
			state: state,
			recruitment_number: recruitmentNumber,
			deadline: deadline.value as Date,
			chatting_url: chatUrl.value as string,
		};
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/create/${page}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		).catch((err) => {
			throw new Error('Failed to fetch data');
		});
		// state 초기화
		title.init('');
		setContent('');
		setImgArr([]);
		setState(false);
		deadline.init(new Date());
		chatUrl.init('');
		setRecruitmentNumber(0);

		// 데이터 삽입후 페이지 이동
		return router.push(`/community/${page}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<span className={styles.headerTitle}>모임을 만들어 보세요.</span>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
				value={title.value as string | ''}
				onChange={title.onChange}
			/>
			<OptionBookMeeting
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
				<EditorComponent />
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
	);
};

export default BookMeetingPostPage;
