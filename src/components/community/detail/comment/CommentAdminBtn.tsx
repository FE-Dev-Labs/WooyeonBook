'use client';

import {
	isUpdateState,
	updateComment,
} from '@/recoil/atom/communityCommentAtom';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';
import styles from '@/styles/community/detail/CommentAdminBtn.module.css';
import { useEffect } from 'react';

const CommentAdminBtn = ({
	data,
	id,
}: {
	data: {
		id: string;
		created_at: Date;
		comment: string;
		created_user: string;
		created_user_name: string;
		doc_id: string;
		check: boolean;
		like: number;
	};
	id: string;
}) => {
	const supabase = createClient();
	const [updateSteate, setUpdateState] = useRecoilState(isUpdateState);
	const [text, setText] = useRecoilState(updateComment);
	useEffect(() => {
		setText(data.comment);
	}, []);

	const handleUpdate = () => {
		setUpdateState(id);
		setText(data.comment);
	};

	const onUpdate = async () => {
		const updateData = {
			id: updateSteate,
			created_at: new Date(),
			comment: text,
			like: data.like,
			created_user: data.created_user,
			created_user_name: data.created_user_name,
			doc_id: data.doc_id,
			check: data.check,
		};
		const response = supabase
			.from('comment')
			.update(updateData)
			.eq('id', updateSteate);
		const { error } = await response;
		if (error) {
			throw error;
		}
		setUpdateState('');
		window.location.reload();
	};
	const deleteComment = async () => {
		const response = supabase.from('comment').delete().eq('id', id);
		const { error } = await response;
		if (error) {
			throw error;
		}
		window.location.reload();
	};
	return (
		<div className={styles.adminBtnWrap}>
			{updateSteate === id ? (
				<button className={styles.updateBtn} onClick={onUpdate}>
					수정
				</button>
			) : (
				<button className={styles.updateBtn} onClick={handleUpdate}>
					수정
				</button>
			)}
			<button className={styles.deleteBtn} onClick={deleteComment}>
				삭제
			</button>
		</div>
	);
};

export default CommentAdminBtn;
