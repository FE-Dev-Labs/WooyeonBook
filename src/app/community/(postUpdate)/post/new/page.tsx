'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/community/post/postNewPage.module.css';
import { useRecoilState } from 'recoil';
import { editorText } from '@/recoil/atom/editorAtom';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { selectBookData } from '@/recoil/atom/\bbookIdAtom';
import { useInputState } from '@/hooks/useInputState';
import OptionBookReport from '@/components/community/post/OptionBookReport';
import OptionBookMeeting from '@/components/community/post/OptionBookMeeting';
import OptionBookBuying from '@/components/community/post/OptionBookBuying';
import OptionBookSelling from '@/components/community/post/OptionBookSelling';
import {
	bookBuyingOnSubmit,
	bookMeetingOnSubmit,
	bookReportOnSubmit,
	bookSellingOnSubmit,
} from '@/apis/community/post/onSubmit';

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
export default function PostPage() {
	// navigation
	const router = useRouter();
	// page params
	const pageParams = useSearchParams();
	const page = pageParams.get('page');

	// editor state area
	const [text, setText] = useRecoilState(editorText);

	// PostPage state area
	const title = useInputState('');

	// meeting state area
	const chatUrl = useInputState('');
	const deadline = useInputState(new Date());

	// selling state area
	const price = useInputState('');

	// select book id
	const [selectedBook, setSeletedBook] = useRecoilState(selectBookData);

	// select state & onchange event
	const [recruitmentNumber, setRecruitmentNumber] = useState<number>(0);
	const onchangeRecruitmentNumber = (e: any) => {
		setRecruitmentNumber(e.value);
	};
	const [bookState, setBookState] = useState<string>('');
	const onchangeBookState = (e: any) => {
		setBookState(e.value);
	};
	const [sellingState, setSellingState] = useState<string>('');
	const onchangeSellingState = (e: any) => {
		setSellingState(e.value);
	};

	const returnHeaderText = () => {
		if (page === 'bookReport') {
			return '독후감을 작성하고 공유해 보세요.';
		}
		if (page === 'bookMeeting') {
			return '모임을 만들어 보세요.';
		}
		if (page === 'bookBuying') {
			return '중고 책을 구매해보세요.';
		}
		if (page === 'bookSelling') {
			return '책을 나누고 판매해 보세요.';
		}
	};
	const returnOptionComponent = () => {
		if (page === 'bookReport') {
			return <OptionBookReport />;
		}
		if (page === 'bookMeeting') {
			return (
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
			);
		}
		if (page === 'bookBuying') {
			return (
				<OptionBookBuying
					sellingPrice={
						price as {
							value: string;
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
						}
					}
				/>
			);
		}
		if (page === 'bookSelling') {
			return (
				<OptionBookSelling
					sellingPrice={
						price as {
							value: string;
							onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
						}
					}
					onchangeBookState={onchangeBookState}
					onchangeSellingState={onchangeSellingState}
				/>
			);
		}
	};
	const returnOnSubmit = () => {
		if (page === 'bookReport') {
			return bookReportOnSubmit({
				page,
				title,
				router,
				text,
				setText,
				selectedBook,
				setSeletedBook,
			});
		}
		if (page === 'bookMeeting') {
			return bookMeetingOnSubmit({
				page,
				title,
				recruitmentNumber,
				setRecruitmentNumber,
				chatUrl,
				deadline,
				router,
				text,
				setText,
			});
		}
		if (page === 'bookBuying') {
			return bookBuyingOnSubmit({
				page,
				title,
				price,
				router,
				text,
				setText,
				selectedBook,
				setSeletedBook,
			});
		}
		if (page === 'bookSelling') {
			return bookSellingOnSubmit({
				title,
				text,
				setText,
				selectedBook,
				setSeletedBook,
				page,
				price,
				bookState,
				sellingState,
				router,
			});
		}
	};
	if (!page) {
		return router.push('/error');
	}
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>{returnHeaderText()}</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
				value={title.value as string}
				onChange={title.onChange}
			/>
			{returnOptionComponent()}
			<div>
				<EditorComponent />
			</div>
			<div className={styles.BtnWrap}>
				<button>취소</button>
				<button onClick={() => returnOnSubmit()}>등록</button>
			</div>
		</div>
	);
}
