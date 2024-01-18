import Link from 'next/link';
import styles from '@/styles/community/detail/DetailPage.module.css';
import dynamic from 'next/dynamic';

export default function page() {
	const View = dynamic(() => import('@/components/common/Viewer'), {
		ssr: false,
	});

	return (
		<div className={styles.container}>
			<h2 className={styles.title}>title</h2>
			<div className={styles.infoWrap}>
				<div className={styles.contentInfoWrap}>
					<div>작성일</div>
					<div className={styles.dot}>●</div>
					<div>조회수</div>
					<div className={styles.dot}>●</div>
					<div>댓글</div>
				</div>
				<div className={styles.adimBtnWrap}>
					<Link href={`community/edit?type=${`###`}/${`docId`}}`}>수정</Link>
					<button>삭제</button>
				</div>
			</div>
			<hr className={styles.line} />
			<div className={styles.viewerWrap}>
				<View />
			</div>
			<hr className={styles.line} />
			<div className={styles.commentHeader}>
				<div className={styles.commentCount}>댓글 ##</div>
				<div className={styles.commentSortWrap}>
					<button>좋아요순</button>
					<div className={styles.dot}>●</div>
					<button>최신순</button>
				</div>
			</div>
			<div className={styles.commentCreateWrap}>
				<button>###님, 댓글을 작성해보세요.</button>
			</div>
			<div className={styles.commentCreateBoxWrap}>
				<textarea />
				<div>
					<button>취소</button>
					<button>등록</button>
				</div>
			</div>
			<div className={styles.commnetWrap}>
				<div className={styles.commentInfoWrap}>
					<div>
						<div>작성자</div>
						<div>작성일</div>
					</div>
					<div>
						<button>수정</button>
						<button>삭제</button>
					</div>
				</div>
				<div className={styles.commentContentWrap}>
					<p>
						댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용 댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용
						댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글 내용댓글
						내용댓글 내용댓글 내용댓글 내용
					</p>
				</div>
				<div className={styles.contentBtnWrap}>
					<button>공유</button>
				</div>
				<hr />
			</div>
		</div>
	);
}
