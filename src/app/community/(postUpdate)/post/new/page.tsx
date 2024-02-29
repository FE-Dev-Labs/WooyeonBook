'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/community/post/postNewPage.module.css';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { editorText } from '@/recoil/atom/editorAtom';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { communityPostData } from '@/apis/communityPostData';
import BookSearch from '@/components/community/post/BookSearch';
import { book_id, book_name, selectBookData } from '@/recoil/atom/\bbookIdAtom';
import { useInputState } from '@/hooks/useInputState';
import OptionBookReport from '@/components/community/post/OptionBookReport';
import OptionBookMeeting from '@/components/community/post/OptionBookMeeting';
import OptionBookBuying from '@/components/community/post/OptionBookBuying';
import OptionBookSelling from '@/components/community/post/OptionBookSelling';

const Editor = dynamic(
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
export default function postNewPage() {
	// navigation
	const router = useRouter();
	// page params
	const pageParams = useSearchParams();
	const page = pageParams.get('page');
	// editor text
	const text = useRecoilValue(editorText);
	// title state
	const title = useInputState('');
	// meeting chatUrl state
	const chatUrl = useInputState('');
	//  meeting deadline state
	const deadline = useInputState(new Date());
	// selling price state
	const sellingPrice = useInputState('');
	// select book id
	const book_Id = useRecoilValue(book_id);
	const seletedBook = useSetRecoilState(selectBookData);
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

	// supabase database submit event
	const onSubmit = async () => {
		// page별 데이터 생성
		const data = communityPostData({
			page,
			title: title.value as string,
			text,
			recruitmentNumber,
			chatUrl: chatUrl.value as string,
			deadline: deadline.value as Date,
			bookState,
			sellingState,
			sellingPrice: sellingPrice.value as string,
			book_Id,
		});
		// supabase 데이터베이스에 데이터 삽입
		const { error } = await supabase.from(`${page}`).insert([data]);
		// 에러 발생시 alert
		if (error) {
			return alert('에러가 발생했습니다.');
		}
		// 데이터 삽입후 페이지 이동
		return router.push(`/community/${page}`);
	};
	// header text by page
	const headerText = () => {
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
	const pageSelectArea = () => {
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
						sellingPrice as {
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
						sellingPrice as {
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
	if (!page) {
		return router.push('/error');
	}
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>{headerText()}</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
				value={title.value as string}
				onChange={title.onChange}
			/>
			{pageSelectArea()}
			<div>
				<Editor />
			</div>
			<div className={styles.BtnWrap}>
				<button>취소</button>
				<button onClick={onSubmit}>등록</button>
			</div>
		</div>
	);
}
