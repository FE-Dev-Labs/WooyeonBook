import { AllDataType } from '@/types/community/view/data';
import styles from '@/styles/community/detail/DetailPage.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getDate } from '@/utils/getDate';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import CommentCreate from './comment/CommentCreate';
import CommentItem from './comment/CommentItem';

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
	if (error) {
		throw error;
	}

	const response = supabase.from('comment').select('*');

	switch (searchParams?.sort) {
		case 'like':
			response.order('like', { ascending: false });
		case 'lastest':
			response.order('created_at', { ascending: false });
		default:
			response;
	}
	const { data: commnet, error: commentError } = await response;
	if (commentError) {
		throw commentError;
	}

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
						<Link href={`/community/update/bookReport/${data.doc_id}`}>
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
					<label className={styles.optionItemTitle}>독후감 책</label>
					<div className={styles.optionItemContent}>{data.book_name}</div>
				</div>
				<hr className={styles.line} />
			</section>
			{/* editor */}
			<div className={styles.viewerWrap}>
				<View content={data.content} />
			</div>
			<hr className={styles.line} />
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
				<CommentCreate page={'bookReport'} doc_id={data.doc_id} />
				{commnet.map((item) => {
					return <CommentItem data={item} key={item.id} />;
				})}
			</section>
		</section>
	);
};

export default BookReport;
