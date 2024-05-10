import { AllDataType } from '@/types/community/view/data';
import styles from '@/styles/community/detail/detailPage.module.css';
import dynamic from 'next/dynamic';
import { getDate } from '@/utils/getDate';
import CommentCreate from './comment/CommentCreate';
import CommentItem from './comment/CommentItem';
import { fetchComments } from '@/apis/community/fetchComments';
import { CommentData } from '@/types/community/comment';
import StateBtn from './StateBtn';
import LikeBtn from './LikeBtn';
import Image from 'next/image';
import DropDownBtn from './DropDownBtn';
import shareIcon from '@/assets/community/shareIcon.png';
import noCommentIcon from '@/assets/community/noComment.png';
interface BookBuyingProps {
	data: AllDataType;
	params: { doc_id: string };
	searchParams?: { sort?: string };
	page: string;
}
const View = dynamic(() => import('@/components/common/Viewer'), {
	ssr: false,
});

const BookBuying = async ({
	searchParams,
	data,
	page,
	params,
}: BookBuyingProps) => {
	const comments: CommentData[] = await fetchComments(data.doc_id);

	return (
		<section className={styles.container}>
			<section className={styles.optionContainer}>
				<h2 className={styles.title}>{data.title}</h2>
				{/* 날짜,조회수,좋아요 */}
				<div className={styles.optionItemWrap}>
					<div className={styles.infoWrap}>
						<div className={styles.contentInfoWrap}>
							<div>{getDate(data.created_at)}</div>
							<div className={styles.dot}>･</div>
							<div>조회수{data.view}</div>
							<div className={styles.dot}>･</div>
							<div>좋아요{data.like_users.length} </div>
						</div>
					</div>
				</div>
			</section>
			{/* 모임 내용 */}
			<div className={styles.OptionaccordionContainer}>
				<section className={styles.optionBuyingContainer}>
					<div className={styles.optionItemWrap}>
						<label className={styles.optionItemTitle}>판매하는 책</label>
						<div className={styles.optionItemContent}>{data.book_name}</div>
					</div>
					<div className={styles.optionItemWrap}>
						<label className={styles.optionItemTitle}>희망 구매 가격</label>
						<div className={styles.optionItemContent}>{data.price} 원</div>
					</div>
				</section>
				<View content={data.content} />
			</div>
			{/* 책 내용 */}
			<div className={styles.viewerWrap}>
				<div className={styles.viewBtnWrap}>
					<StateBtn
						page={'bookBuying'}
						doc_id={params.doc_id}
						state={data.state as boolean}
						admin={data.created_user}
					/>
					<LikeBtn
						page={'bookBuying'}
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
					<DropDownBtn data={data} page="bookBuying" />
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
				{comments.length === 0 && (
					<div className={styles.noCommnetWrapper}>
						<div className={styles.noCommentWrap}>
							<Image
								src={noCommentIcon}
								alt="noCommentIcon"
								width={25}
								height={25}
							/>
							<div className={styles.noCommnetTxtWrap}>
								<p className={styles.noCommentTxt}>
									댓글을 기다리고 있습니다.
									<br></br>
									첫번째 댓글을 남겨보세요!
								</p>
							</div>
						</div>
					</div>
				)}
				<ul>
					{comments.map((item) => {
						return <CommentItem data={item} key={item.id} />;
					})}
				</ul>
			</section>
		</section>
	);
};

export default BookBuying;
