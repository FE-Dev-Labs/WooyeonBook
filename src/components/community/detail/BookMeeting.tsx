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
interface BookMeetingProps {
	data: AllDataType;
	searchParams?: { sort?: string };
}
const View = dynamic(() => import('@/components/common/Viewer'), {
	ssr: false,
});

const BookMeeting = async ({ searchParams, data }: BookMeetingProps) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	const { comments } = await getDetailCommentData({ data, searchParams });

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{data.title}</h2>
			<div className={styles.infoWrap}>
				<div className={styles.contentInfoWrap}>
					<div>{getDate(data.created_at)}</div>
					<div className={styles.dot}>●</div>
					<div>조회수 : {data.view}</div>
					<div className={styles.dot}>●</div>
					<div>좋아요 : {data.like} </div>
				</div>
				{data?.created_user === user?.id ? (
					<div className={styles.adimBtnWrap}>
						<Link href={`/community/update/bookMeeting/${data.doc_id}`}>
							수정
						</Link>
						<button>삭제</button>
					</div>
				) : null}
			</div>
			<hr className={styles.line} />
			{/* option */}
			<section className={styles.optionContainer}>
				<div className={styles.optionItemWrap}>
					<label className={styles.optionItemTitle}>카카오 오픈 채팅방</label>
					<Link
						href={data.chatting_url as string}
						className={styles.optionItemContent}>
						{data.chatting_url}
					</Link>
				</div>
				<div className={styles.optionItemWrap}>
					<label className={styles.optionItemTitle}>모집 마감일</label>
					<div className={styles.optionItemContent}>
						{getDate(data.deadline as Date)}
					</div>
				</div>
				<div className={styles.optionItemWrap}>
					<label className={styles.optionItemTitle}>모집 인원</label>
					<div className={styles.optionItemContent}>
						{data.recruitment_number} 명
					</div>
				</div>
				<hr className={styles.line} />
			</section>
			{/* editor */}
			<div className={styles.viewerWrap}>
				<View content={data.content} />
			</div>
			{/* 댓글 */}
			<section>
				<div className={styles.commentHeader}>
					<div className={styles.commentCount}>댓글 ##</div>
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
				<CommentCreate page={'bookBuying'} doc_id={data.doc_id} />
				{comments.map((item) => {
					return <CommentItem data={item} key={item.id} />;
				})}
			</section>
		</section>
	);
};

export default BookMeeting;
