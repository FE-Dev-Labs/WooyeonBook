'use client';

import dynamic from 'next/dynamic';
import { usePathname, useRouter } from 'next/navigation';
import styles from '@/styles/community/post/postNewPage.module.css';
import { useInputState } from '@/hooks/useInputState';
import { useRecoilState } from 'recoil';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import { supabase } from '@/utils/supabase/supabase';
import { BookSellingPostDataType } from '@/types/community/post/data';
import OptionBookSelling from '@/components/community/post/option/OptionBookSelling';
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

const BookSellingPostPage = () => {
	const router = useRouter();
	const params = usePathname();
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
	// 선택한 책 data
	const [selectedBook, setSeletedBook] = useRecoilState(selectBookData);

	// 가격
	const price = useInputState(0);
	// 판매 / 나눔
	const [sellingState, setSellingState] = useState<string>('');
	const onchangeSellingState = (e: any) => {
		setSellingState(e.value);
	};
	const onSubmit = async () => {
		const { user_id, user_name } = await getUser();

		const data: BookSellingPostDataType = {
			created_at: new Date(),
			created_user: user_id as string,
			title: title.value as string,
			content: content,
			content_img_url: imgArr,
			user_name: user_name as string,
			book_id: selectedBook.bookId,
			book_name: selectedBook.bookName,
			book_img_url: selectedBook.bookImgUrl,
			field: page,
			category: 'category',
			view: 0,
			like: 0,
			price: price.value as number,
			state: false,
			selling: sellingState === '판매' ? true : false,
		};
		// supabase 데이터베이스에 데이터 삽입
		const { error } = await supabase.from(`${page}`).insert([data]);
		// 에러 발생시 alert
		if (error) {
			return alert('에러가 발생했습니다.');
		}
		// state 초기화
		title.init('');
		setContent('');
		setImgArr([]);
		setSeletedBook({
			bookName: '',
			bookImgUrl: '',
			bookId: '',
		});
		price.init(0);
		// 데이터 삽입후 페이지 이동
		return router.push(`/community/${page}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>책을 나누고 판매해 보세요.</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
				value={title.value as string | ''}
				onChange={title.onChange}
			/>
			<OptionBookSelling
				sellingPrice={
					price as {
						value: string;
						onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
					}
				}
				onchangeSellingState={onchangeSellingState}
			/>

			<div>
				<EditorComponent />
			</div>
			<div className={styles.BtnWrap}>
				<button className={styles.cancelBtn}>취소</button>
				<button onClick={onSubmit} className={styles.submitBtn}>
					등록
				</button>
			</div>
		</div>
	);
};

export default BookSellingPostPage;
