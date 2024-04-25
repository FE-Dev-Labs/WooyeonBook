import styles from '@/styles/community/detail/detailPage.module.css';
import { getDate } from '@/utils/getDate';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import Comment from './Comment';
import CommentAdminBtn from './CommentAdminBtn';

const CommentItem = async ({
	data,
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
}) => {
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
				{isAdmin && <CommentAdminBtn data={data} id={data.id} />}
			</div>
			<Comment id={data.id} comment={data.comment} />
			{/* <div className={styles.contentBtnWrap}>
				<button>공유</button>
			</div> */}
		</div>
	);
};

export default CommentItem;
