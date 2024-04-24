import { AllDataType } from '@/types/community/view/data';
import styles from '@/styles/community/detail/DetailPage.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getDate } from '@/utils/getDate';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import CommentCreate from './comment/CommentCreate';
import CommentItem from './comment/CommentItem';
import { getDetailCommentData } from '@/apis/community/getDetailCommentData';
import DropDownBtn from './DropDownBtn';

interface BookReportProps {
	data: AllDataType;
	searchParams?: { sort?: string };
}
const View = dynamic(() => import('@/components/common/Viewer'), {
	ssr: false,
});

const BookReport = async ({ searchParams, data }: BookReportProps) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const { comments } = await getDetailCommentData({ data, searchParams });
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
				<DropDownBtn data={data} user={user} />
			</div>
			<hr className={styles.line} />
			{/* 댓글 */}
			<section>
				<div className={styles.commentHeader}>
					<div className={styles.commentCount}>댓글 {comments.length}</div>
					<div className={styles.commentSortWrap}>
						<Link
							href={`/community/detail/bookReport/${data.doc_id}?sort=like`}
							scroll={false}>
							좋아요순
						</Link>
						<div className={styles.dot}>●</div>
						<Link
							href={`/community/detail/bookReport/${data.doc_id}?sort=lastest`}
							scroll={false}>
							최신순
						</Link>
					</div>
				</div>
				<CommentCreate page={'bookReport'} doc_id={data.doc_id} />
				{comments.map((item) => {
					return <CommentItem data={item} key={item.id} />;
				})}
			</section>
		</section>
	);
};

export default BookReport;
