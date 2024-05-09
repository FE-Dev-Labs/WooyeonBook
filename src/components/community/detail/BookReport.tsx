import { AllDataType } from '@/types/community/view/data';
import styles from '@/styles/community/detail/detailPage.module.css';
import dynamic from 'next/dynamic';
import { getDate } from '@/utils/getDate';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import CommentCreate from './comment/CommentCreate';
import CommentItem from './comment/CommentItem';
import DropDownBtn from './DropDownBtn';
import StateBtn from './StateBtn';
import LikeBtn from './LikeBtn';
import Image from 'next/image';
import shareIcon from '@/assets/community/shareIcon.png';
import { fetchComments } from '@/apis/community/comment/CRUD';
import { CommentData } from '@/types/community/comment';

interface BookReportProps {
	data: AllDataType;
	params: { doc_id: string };
}
const View = dynamic(() => import('@/components/common/Viewer'), {
	ssr: false,
});

const BookReport = async ({ data, params }: BookReportProps) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const comments: CommentData[] = await fetchComments(data.doc_id as string);

	return (
		<section className={styles.container}>
			<section className={styles.optionContainer}>
				<h2 className={styles.title}>{data.title}</h2>
				{/* 책 정보 */}
				<div className={styles.optionItemWrap}>
					<div className={styles.optiondivice}>
						<div className={styles.optionItemTitle}>독후감 책</div>
						<div className={styles.dot}>･</div>
						<div className={styles.optionItemContent}>{data.book_name}</div>
					</div>
					{/* 날짜,조회수,좋아요 */}
					<div className={styles.infoWrap}>
						<div className={styles.contentInfoWrap}>
							<div>{getDate(data.created_at)}</div>
							<div className={styles.dot}>･</div>
							<div>조회수 {data.view}</div>
							<div className={styles.dot}>･</div>
							<div>좋아요 {data.like_users.length} </div>
						</div>
					</div>
				</div>
			</section>

			{/* 책 내용 */}
			<div className={styles.viewerWrap}>
				<View content={data.content} />
				<div className={styles.viewBtnWrap}>
					<StateBtn
						page={'bookReport'}
						doc_id={params.doc_id}
						state={data.state as boolean}
						admin={data.created_user}
					/>
					<LikeBtn
						page={'bookReport'}
						doc_id={params.doc_id}
						like={data.like_users}
					/>
					<div className={styles.shareBtnWrap}>
						<button className={styles.shareBtn}>
							<Image
								src={shareIcon}
								alt="shareIcon"
								width={15}
								height={15}
								className={styles.iconsStyle}
							/>
							<span className={styles.shareText}>공유</span>
						</button>
					</div>
					<DropDownBtn data={data} user={user} page="bookReport" />
				</div>
			</div>
			{/* 댓글 */}
			<section className={styles.commentWrapper}>
				<div className={styles.commentHeader}>
					<div className={styles.commentCount}>댓글 </div>
					<span className={styles.commentCountLength}>{comments.length}</span>
					<div className={styles.commentSortWrap}></div>
				</div>
				<CommentCreate page={'bookReport'} doc_id={data.doc_id} />
				<ul>
					{comments.map((item) => {
						return <CommentItem data={item} key={item.id} />;
					})}
				</ul>
			</section>
		</section>
	);
};

export default BookReport;
