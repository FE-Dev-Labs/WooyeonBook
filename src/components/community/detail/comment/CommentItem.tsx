import styles from '@/styles/community/detail/detailPage.module.css';
import { getDate } from '@/utils/getDate';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Comment from './Comment';
import CommentAdminBtn from './CommentAdminBtn';
import { CommentData } from '@/types/community/comment';

const CommentItem = async ({ data }: { data: CommentData }) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) {
		throw error;
	}
	const isAdmin = data.created_user === user?.id;
	return (
		<li className={styles.commentListWrapper}>
			<div className={styles.commentListUserSelection}>
				<span className={styles.commentListUserName}>
					{data.created_user_name}
				</span>
				<em className={styles.divice}></em>
				<span className={styles.commentListDate}>
					{getDate(data.created_at)}
				</span>
			</div>
			<div className={styles.commentModifyWrapper}>
				<Comment id={data.id} comment={data.comment} />
				{isAdmin && <CommentAdminBtn data={data} id={data.id} />}
			</div>
		</li>
	);
};

export default CommentItem;
