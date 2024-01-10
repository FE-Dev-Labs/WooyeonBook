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
			<hr />
			<div>
				<div>답변 ##</div>
				<div>
					<div>좋아요</div>
					<div>최신순</div>
				</div>
			</div>
			<div>
				<button>댓글 작성하기</button>
			</div>
			<div>댓글</div>
		</div>
	);
}
