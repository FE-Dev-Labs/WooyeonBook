'use client';
import styles from '@/styles/community/update/update.module.css';
import dynamic from 'next/dynamic';
import { BookBuyingDataType } from '@/types/community/post/data';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useInputState } from '@/hooks/useInputState';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import OptionBookBuying from '../../post/option/OptionBookBuying';

interface UpdateProps {
	data?: BookBuyingDataType;
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

function BookBuyingUpdate({ data, docid }: UpdateProps) {
	const router = useRouter();
	const title = useInputState('');
	const price = useInputState(0);
	const [text, setText] = useRecoilState(editorText);
	const [contentArr, setContentArr] = useRecoilState(editorImgArr);
	const [selectedBook, setSeletedBook] = useRecoilState(selectBookData);
	const [buyingState, setBuyingState] = useState<boolean>(false);
	const view = data?.view;
	const like = data?.like;
	useEffect(() => {
		if (!data) return;
		title.onChangeValue(data.title as string);
		setText(data.content as string);
		setContentArr(data.content_img_url as string[]);
		setSeletedBook({
			bookId: data.book_id,
			bookName: data.book_name,
			bookImgUrl: data.book_img_url,
		});
		price.onChangeValue(data.price);
		setBuyingState(data.state);
	}, []);

	const onSubmit = async () => {
		const data = {
			doc_id: docid,
			created_at: new Date(),
			created_user: 'd35c8e87-0aa7-40a0-9d2d-b1a81ebebd8a',
			title: title.value,
			content: text,
			content_img_url: contentArr,
			user_name: 'user-name',
			book_name: selectedBook.bookName,
			book_img_url: selectedBook.bookImgUrl,
			book_id: selectedBook.bookId,
			field: 'bookBuying',
			category: 'bookBuying',
			view: view,
			price: price.value,
			like: like,
			state: buyingState,
		};
		// supabase 데이터베이스에 데이터 삽입
		const { error } = await supabase
			.from('bookBuying')
			.update(data)
			.eq('doc_id', docid)
			.select();
		// 에러 발생시 alert
		if (error) {
			return alert('에러가 발생했습니다.');
		}
		// state 초기화
		title.init('');
		setText('');
		setContentArr([]);
		setSeletedBook({
			bookId: '',
			bookName: '',
			bookImgUrl: '',
		});
		price.init('');
		setBuyingState(false);

		return router.push('/');
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>중고 책을 구매해보세요.</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder={data?.title}
				onChange={title.onChange}
			/>
			<OptionBookBuying
				sellingPrice={
					price as {
						value: number;
						onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
					}
				}
			/>
			<div>
				<EditorComponent data={data} />
			</div>
			<div className={styles.BtnWrap}>
				<button>취소</button>
				<button onClick={onSubmit}>등록</button>
			</div>
		</div>
	);
}

export default BookBuyingUpdate;
