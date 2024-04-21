'use client';
import styles from '@/styles/community/update/update.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useInputState } from '@/hooks/useInputState';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { useRouter } from 'next/navigation';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import OptionBookBuying from '../../post/option/OptionBookBuying';
import { BookBuyingDataType } from '@/types/community/view/data';
import { getUser } from '@/apis/community/getUser';

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
	const goback = () => {
		return router.back();
	};
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
		const { user_id, user_name } = await getUser();

		const data = {
			doc_id: docid,
			created_at: new Date(),
			created_user: user_id as string,
			title: title.value,
			content: text,
			content_img_url: contentArr,
			user_name: user_name as string,
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
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/update/bookBuying/${docid}`,
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(data),
			},
		);
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
				<button onClick={goback} className={styles.cancelBtn}>
					취소
				</button>
				<button onClick={onSubmit} className={styles.submitBtn}>
					등록
				</button>
			</div>
		</div>
	);
}

export default BookBuyingUpdate;
