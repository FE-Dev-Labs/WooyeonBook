'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/community/post/postNewPage.module.css';
import { RecoilValue, useRecoilValue } from 'recoil';
import { editorText } from '@/recoil/atom/editorAtom';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { communityPostData } from '@/apis/communityPostData';
import BookSearch from '@/components/community/post/BookSearch';
import axios from 'axios';
const Select = dynamic(() => import('react-select'), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: '500px',
				height: '38px',
				backgroundColor: '#a5a5a5',
				borderRadius: '5px',
				marginRight: '50px',
			}}></div>
	),
});
const Editor = dynamic(
	() => import('@/components/community/post/WysiwygEditor'),
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
	// title input state
	const [title, setTitle] = useState<string>('');
	// title input event
	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	// meeting recruitment number
	const [recruitmentNumber, setRecruitmentNumber] = useState<number>(0);
	const onchangeRecruitmentNumber = (e: any) => {
		setRecruitmentNumber(e.value);
	};

	// meeting chat url
	const [chatUrl, setChatUrl] = useState<string>('');
	const onchangeChatUrl = (e: React.ChangeEvent<HTMLInputElement>) => {
		setChatUrl(e.target.value);
	};
	// meeting deadline
	const [deadline, setDeadline] = useState<Date>(new Date());
	const onchangeDeadline = (e: React.ChangeEvent<HTMLInputElement>) => {
		const date = new Date(e.target.value);
		setDeadline(date);
	};
	// selling price state
	const [sellingPrice, setSellingPrice] = useState<string>('');
	// selling price event
	const onchangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
		setSellingPrice(e.target.value);
	};
	// selling book state onChange event
	const [bookState, setBookState] = useState<string>('');
	const onchangeBookState = (e: any) => {
		setBookState(e.value);
	};
	// selling state onChange event
	const [sellingState, setSellingState] = useState<string>('');
	const onchangeSellingState = (e: any) => {
		setSellingState(e.value);
	};

	// supabase database submit event
	const onSubmit = async () => {
		// page별 데이터 생성
		const data = communityPostData({
			page,
			title,
			text,
			recruitmentNumber,
			chatUrl,
			deadline,
			bookState,
			sellingState,
			sellingPrice,
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
	// page select
	const pageSelectArea = () => {
		if (page === 'bookReport') {
			return (
				<div className={styles.reportSelectContainer}>
					<div className={styles.reportSelectWrap}>
						<label>책을 선택해주세요.</label>
						<BookSearch />
					</div>
					<div className={styles.reportSelectWrap}>
						<label>선택한 책</label>
						<div className={styles.selectBookText}></div>
					</div>
				</div>
			);
		}
		if (page === 'bookMeeting') {
			const recruitmentOptions = [
				{ value: '', label: '모집 인원을 선택해주세요.' },
				{ value: '1', label: '1명' },
				{ value: '2', label: '2명' },
				{ value: '3', label: '3명' },
				{ value: '4', label: '4명' },
				{ value: '5', label: '5명' },
				{ value: '6', label: '6명' },
				{ value: '7', label: '7명' },
				{ value: '8', label: '8명' },
				{ value: '9', label: '9명' },
				{ value: '10', label: '10명 이상' },
			];
			return (
				<div className={styles.meetingSelectContainer}>
					<div className={styles.meetingSelectWrap}>
						<label>연락 방법</label>
						<input
							type="text"
							placeholder="카카오 오픈채팅방 URL을 입력해주세요."
							value={chatUrl || ''}
							onChange={onchangeChatUrl}
						/>
					</div>
					<div className={styles.meetingSelectWrap}>
						<label>모집 마감일</label>
						<input
							type="date"
							className={styles.dateInput}
							onChange={onchangeDeadline}
						/>
					</div>
					<div className={styles.meetingSelectWrap}>
						<label>모집 인원</label>
						<Select
							className={styles.bookSelectBtn}
							options={recruitmentOptions}
							defaultValue={recruitmentOptions[0]}
							onChange={onchangeRecruitmentNumber}
						/>
					</div>
				</div>
			);
		}
		if (page === 'bookBuying') {
			return (
				<div className={styles.buyingSelectContainer}>
					<div className={styles.buyingSelectWrap}>
						<label>책을 선택해주세요.</label>
						<Select className={styles.bookSelectBtn} />
					</div>
					<div className={styles.buyingSelectWrap}>
						<label>선택한 책</label>
						<div className={styles.selectBookText}></div>
					</div>
					<div className={styles.buyingSelectWrap}>
						<label>구매하고 싶은 가격을 적어주세요.</label>
						<input type="text" value={sellingPrice} onChange={onchangePrice} />
					</div>
				</div>
			);
		}
		if (page === 'bookSelling') {
			const bookStateOptions = [
				{ value: '', label: '책의 상태를 선택해주세요.' },
				{ value: '상', label: '상' },
				{ value: '중', label: '중' },
				{ value: '하', label: '하' },
			];
			const sellingStateOptions = [
				{ value: '', label: '판매 / 나눔' },
				{ value: '판매', label: '판매' },
				{ value: '나눔', label: '나눔' },
			];
			return (
				<div className={styles.sellingSelectContainer}>
					<div className={styles.sellingSelectWrap}>
						<label>책을 선택해주세요.</label>
						<Select className={styles.bookSelectBtn} />
					</div>
					<div className={styles.sellingSelectWrap}>
						<label>선택한 책</label>
						<div className={styles.selectBookText}></div>
					</div>
					<div className={styles.sellingSelectWrap}>
						<label>판매하고 싶은 가격을 적어주세요.</label>
						<input type="text" value={sellingPrice} onChange={onchangePrice} />
					</div>
					<div className={styles.sellingSelectWrap}>
						<label>책의 상태</label>
						<Select
							className={styles.bookSelectBtn}
							options={bookStateOptions}
							defaultValue={bookStateOptions[0]}
							onChange={onchangeBookState}
						/>
					</div>
					<div className={styles.sellingSelectWrap}>
						<label>판매 / 나눔</label>
						<Select
							className={styles.bookSelectBtn}
							options={sellingStateOptions}
							defaultValue={sellingStateOptions[0]}
							onChange={onchangeSellingState}
						/>
					</div>
				</div>
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
				value={title}
				onChange={onChangeTitle}
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
