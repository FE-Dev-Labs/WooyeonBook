'use client';
import styles from '@/styles/community/update/update.module.css';
import OptionBookReport from '../../post/option/OptionBookReport';
import dynamic from 'next/dynamic';
import { BookReportDataType } from '@/types/community/post/data';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import { useInputState } from '@/hooks/useInputState';
import { editorText } from '@/recoil/atom/editorAtom';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/supabase';

interface UpdateProps {
	data?: BookReportDataType;
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

function Update({ data, docid }: UpdateProps) {
	const router = useRouter();
	const title = useInputState('');
	const [text, setText] = useRecoilState(editorText);
	const [selectBook, setSelectBook] = useRecoilState(selectBookData);
	const view = data?.view;
	const like = data?.like;

	useEffect(() => {
		if (!data) return;
		setSelectBook({
			bookName: data.book_name,
			bookImgUrl: data.book_img_url,
			bookId: data.book_id,
		});
	}, []);
	const onSubmit = async () => {
		const data = {
			doc_id: docid,
			created_at: new Date(),
			created_user: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bea',
			title: title.value as string,
			content: text,
			content_img_url: [],
			user_name: 'user',
			book_id: selectBook.bookId,
			book_name: selectBook.bookName,
			book_img_url: selectBook.bookImgUrl,
			field: 'bookReport',
			category: 'bookReport',
			view: view,
			like: like,
		};
		// supabase 데이터베이스에 데이터 삽입
		const { error } = await supabase
			.from('bookReport')
			.update(data)
			.eq('doc_id', docid)
			.select();
		// 에러 발생시 alert
		if (error) {
			return alert('에러가 발생했습니다.');
		}
		// state 초기화
		title.init();
		setText('');
		setSelectBook({
			bookName: '',
			bookImgUrl: '',
			bookId: '',
		});
		return router.push('/');
	};
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>독후감을 작성하고 공유해 보세요.</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder={data?.title}
				onChange={title.onChange}
			/>
			<OptionBookReport />
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

export default Update;
