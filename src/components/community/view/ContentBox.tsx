import styles from '@/styles/community/contentBox.module.css';
import { AllDataType } from '@/types/community/view/data';
import { getDate } from '@/utils/getDate';
import Link from 'next/link';

interface ContentBoxProps {
	data: AllDataType;
	page?: string;
}

export default function ContentBox({ data, page }: ContentBoxProps) {
	return (
		<Link href={`/community/detail/${page}/${data.doc_id}`}>
			<div className={styles.container}>
				{!page ? (
					<h2 className={styles.title}>{data.title}</h2>
				) : (
					<div className={styles.titleWrap}>
						{data.state ? (
							<div className={styles.contentState}>모집 완료</div>
						) : (
							<div className={styles.contentState}>모집 중</div>
						)}

						<h2 className={styles.title}>{data.title}</h2>
					</div>
				)}

				<div className={styles.content}>{data.content}</div>
				<div className={styles.contnetInfoWrap}>
					<div className={styles.authorAndDateWrap}>
						<div>{data.user_name}</div>
						<div className={styles.dot}>●</div>
						<div>{getDate(data.created_at)}</div>
					</div>
					<div className={styles.activityCounters}>
						<div>좋아요 : {data.like}</div>
						<div>조회수 : {data.view}</div>
						<div>댓글</div>
					</div>
				</div>
			</div>
		</Link>
	);
}
