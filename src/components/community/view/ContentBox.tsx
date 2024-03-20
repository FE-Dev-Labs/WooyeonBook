import styles from '@/styles/community/contentBox.module.css';
import { AllDataType } from '@/types/community/view/data';
import Link from 'next/link';

interface ContentBoxProps {
	data: AllDataType;
	page?: string;
}

export default function ContentBox({ data, page }: ContentBoxProps) {
	const date = new Date(data.created_at);
	const year = date.getFullYear();
	const month = ('0' + (date.getMonth() + 1)).slice(-2);
	const day = ('0' + date.getDate()).slice(-2);
	const dateString = year + '년' + month + '월' + day + '일';

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
						<div>{dateString}</div>
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
