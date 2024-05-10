import styles from '@/styles/community/detail/detailPage.module.css';
import { getDate } from '@/utils/getDate';
import Comment from './Comment';
import CommentAdminBtn from './CommentAdminBtn';
import { CommentData } from '@/types/community/comment';

const CommentItem = async ({ data }: { data: CommentData }) => {
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
				<Comment id={data.id as string} comment={data.comment} />
				<CommentAdminBtn data={data} id={data.id as string} />
			</div>
		</li>
	);
};

export default CommentItem;
