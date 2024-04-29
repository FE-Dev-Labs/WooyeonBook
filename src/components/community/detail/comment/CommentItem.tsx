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
		<div className={styles.commnetWrap}>
			<div className={styles.commentInfoWrap}>
				<div>
					<div>{data.created_user_name}</div>
					<div>{getDate(data.created_at)}</div>
				</div>
				{/* client */}
				{isAdmin && <CommentAdminBtn data={data} id={data.id as string} />}
			</div>
			<Comment id={data.id as string} comment={data.comment} />
		</div>
	);
};

export default CommentItem;
