'use client';

import {
	isUpdateState,
	updateComment,
} from '@/recoil/atom/communityCommentAtom';
import { createClient } from '@/utils/supabase/client';
import { useRecoilState } from 'recoil';

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
	const text = useRecoilState(updateComment);

	const handleUpdate = () => {
		setUpdateState(id);
	};

	const onUpdate = async () => {
		const updateData = {
			id: id,
			created_at: new Date(),
			comment: text,
			like: data.like,
			created_user: data.created_user,
			created_user_name: data.created_user_name,
			doc_id: data.doc_id,
			check: data.check,
		};
		const response = supabase.from('comment').update(updateData).eq('id', id);
		const { error } = await response;
		if (error) {
			throw error;
		}
	};
	const deleteComment = async () => {
		const response = supabase.from('comment').delete().eq('id', id);
		const { error } = await response;
		if (error) {
			throw error;
		}
	};
	return (
		<div>
			{updateSteate === id ? (
				<button>수정</button>
			) : (
				<button onClick={handleUpdate}>수정</button>
			)}
			<button onClick={deleteComment}>삭제</button>
		</div>
	);
};

export default CommentAdminBtn;
