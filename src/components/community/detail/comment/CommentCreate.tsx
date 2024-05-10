'use client';
import { getUser } from '@/apis/community/getUser';
import styles from '@/styles/community/detail/detailPage.module.css';
import { createClient } from '@/utils/supabase/client';
import { useState } from 'react';
import { createComment } from '@/apis/community/comment/CRUD';
import { useRouter } from 'next/navigation';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';

interface CommentData {
	id?: string;
	created_at: Date;
	comment: string;
	created_user: string;
	created_user_name: string;
	doc_id: string;
	check: boolean;
	like: number;
}

const CommentCreate = ({ page, doc_id }: { page: string; doc_id: string }) => {
	const router = useRouter();
	const supabase = createClient();

	const [comment, setComment] = useState('');
	// 글자 실시간 표시
	const [inputCount, setInputCount] = useState<number>(0);
	const userInfo = useRecoilValue(userAtom);
	const onChangeText = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setComment(e.target.value);
		if (e.target.value.length > 50) {
			alert('50자 이내로 적어주세요');
		} else {
			setInputCount(e.target.value.length);
		}
	};
	const [createState, setCreateState] = useState(false);

	const handleState = async () => {
		if (userInfo.id === null) {
			router.push('/login');
		} else {
			setCreateState(!createState);
		}
	};
	const onSubmit = async () => {
		const submitData = {
			created_at: new Date(),
			filed: page,
			comment: comment,
			created_user: userInfo.id,
			created_user_name: userInfo.name,
			check: false,
			doc_id: doc_id,
			like: 0,
		};
		await createComment(submitData as CommentData, doc_id as string);

		setCreateState(false);
		setComment('');
		setInputCount(0); // 댓글 글자수도 초기화
		console.log(process.env.NEXT_PUBLIC_SERVER_BASE_URL);

		window.location.reload();
	};
	const cancleComment = () => {
		setCreateState(false);
		setComment('');
	};

	return (
		<div>
			{/* create  btn client*/}
			{!createState && (
				<div>
					<div className={styles.commentCreateWrap}>
						<input
							type="text"
							placeholder="한글 기준 50자까지 작성 가능합니다."
							onFocus={handleState}
							className={styles.commentInput}
							maxLength={50}
						/>
					</div>
				</div>
			)}
			{/* create box client*/}
			{createState && (
				<div className={styles.commentWrapper}>
					<div className={styles.commentCreateBoxWrap}>
						<input
							type="text"
							placeholder="한글 기준 50자까지 작성 가능합니다."
							value={comment}
							onChange={onChangeText}
							maxLength={50}
						/>
						<div className={styles.commentBtnWrapper}>
							<button onClick={onSubmit} className={styles.updateBtn}>
								등록
							</button>
							<button onClick={cancleComment} className={styles.cancelBtn}>
								취소
							</button>
						</div>
					</div>
					<div className={styles.commentInputCount}>
						<span className={styles.commentInputCountTxt}>{inputCount}</span>
						<span className={styles.commentCount}>/50 자</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default CommentCreate;
