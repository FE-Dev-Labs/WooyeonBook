'use client';
import styles from '@/styles/community/update/update.module.css';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { selectBookData } from '@/recoil/atom/bookIdAtom';
import { useInputState } from '@/hooks/useInputState';
import { editorImgArr, editorText } from '@/recoil/atom/editorAtom';
import { useRouter } from 'next/navigation';
import OptionBookSelling from '../../post/option/OptionBookSelling';
import { BookSellingDataType } from '@/types/community/view/data';
import { getUser } from '@/apis/community/getUser';

interface UpdateProps {
	data?: BookSellingDataType;
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
	const price = useInputState('');
	const [state, setState] = useState<boolean>(false);
	const [text, setText] = useRecoilState(editorText);
	const [contentArr, setContentArr] = useRecoilState(editorImgArr);
	const [selectBook, setSelectBook] = useRecoilState(selectBookData);
	const [sellingState, setSellingState] = useState<boolean>(false);
	const onchangeSellingState = (e: any) => {
		setSellingState(e.value);
	};
	const view = data?.view;
	const like = data?.like;

	const goback = () => {
		return router.back();
	};

	useEffect(() => {
		if (!data) return;
		title.onChangeValue(data.title);
		price.onChangeValue(data.price);
		setText(data.content);
		setContentArr(data.content_img_url as string[]);
		setState(data.state);
		setSelectBook({
			bookName: data.book_name,
			bookImgUrl: data.book_img_url,
			bookId: data.book_id,
		});
		setSellingState(data.state);
	}, []);
	const onSubmit = async () => {
		const { user_id, user_name } = await getUser();

		const data = {
			doc_id: docid,
			created_at: new Date(),
			created_user: user_id as string,
			title: title.value as string,
			content: text,
			content_img_url: contentArr as string[],
			user_name: user_name as string,
			book_id: selectBook.bookId,
			book_name: selectBook.bookName,
			book_img_url: selectBook.bookImgUrl,
			field: 'bookSelling',
			category: 'bookSelling',
			view: view,
			like: like,
			state: state,
			price: price.value,
			selling: sellingState,
		};
		await fetch(
			`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/community/update/bookSelling/${docid}`,
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
		price.init(0);
		setText('');
		setState(false);
		setSelectBook({
			bookName: '',
			bookImgUrl: '',
			bookId: '',
		});
		setSellingState(false);
		return router.push(`/community/detail/bookSelling/${docid}`);
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

export default Update;
