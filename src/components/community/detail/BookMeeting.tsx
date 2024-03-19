import { AllDataType } from '@/types/community/view/data';
import styles from '@/styles/community/detail/DetailPage.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getDate } from '@/utils/getDate';
interface BookMeetingProps {
	data: AllDataType;
}
const View = dynamic(() => import('@/components/common/Viewer'), {
	ssr: false,
});

const BookMeeting = ({ data }: BookMeetingProps) => {
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
				<div className={styles.adimBtnWrap}>
					<Link href={`/community/update/bookReport/${data.doc_id}`}>수정</Link>
					<button>삭제</button>
				</div>
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
		</section>
	);
};

export default BookMeeting;
