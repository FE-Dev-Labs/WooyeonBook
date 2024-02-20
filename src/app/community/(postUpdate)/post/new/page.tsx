'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/community/post/postNewPage.module.css';
import { RecoilValue, useRecoilValue } from 'recoil';
import { editorText } from '@/recoil/atom/editorAtom';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { communityPostData } from '@/apis/communityPostData';
// dynamic import loading skeleton ui
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
	const [title, setTitle] = useState('');
	// title input event
	const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};
	// supabase database submit event
	const onSubmit = async () => {
		// page별 데이터 생성
		const data = communityPostData({ page, title, text });
		// supabase 데이터베이스에 데이터 삽입
		const { error } = await supabase.from(`${page}`).insert([data]);
		// 에러 발생시 alert
		if (error) {
			return alert('에러가 발생했습니다.');
		}
		// 데이터 삽입후 페이지 이동
		return router.push(`/community/${page}`);
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>header 영역 입니다.</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
				value={title}
				onChange={onChangeTitle}
			/>
			<div className={styles.optionWrap}>
				<Select className={styles.bookSelectBtn} />
				<div>이 책이 맞나용?</div>
			</div>
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
