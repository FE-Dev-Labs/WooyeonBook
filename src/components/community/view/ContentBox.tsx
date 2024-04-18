import styles from '@/styles/community/contentBox.module.css';
import { AllDataType } from '@/types/community/view/data';
import { getDate } from '@/utils/getDate';
import NaviLab from './nav/NaviLab';
import Image from 'next/image';
interface ContentBoxProps {
	data: AllDataType;
	page?: string;
}

export default async function ContentBox({ data, page }: ContentBoxProps) {
	const title = () => {
		switch (page) {
			case 'bookReport':
				return (
					<div className={styles.titleWrap}>
						<div className={styles.postImgArea}>
							{data.book_img_url ? (
								<Image
									className={styles.postImg}
									src={data.book_img_url}
									alt="책표지"
									width={200}
									height={200}
								/>
							) : null}
						</div>
						<h2 className={styles.title}>{data.title}</h2>
					</div>
				);
			case 'bookMeeting':
				return (
					<div className={styles.titleWrap}>
						{data.state ? (
							<div className={styles.contentState}>모집 완료</div>
						) : (
							<div className={styles.contentState}>모집중</div>
						)}
						<h2 className={styles.title}>{data.title}</h2>
					</div>
				);
			case 'bookBuying':
				return (
					<div className={styles.titleWrap}>
						{data.state ? (
							<div className={styles.contentState}>거래 완료</div>
						) : (
							<div className={styles.contentState}>거래중</div>
						)}
						<h2 className={styles.title}>{data.title}</h2>
					</div>
				);
			case 'bookSelling':
				return (
					<div className={styles.titleWrap}>
						{data.selling ? (
							<div className={styles.contentState}>나눔</div>
						) : (
							<div className={styles.contentState}>팝니다</div>
						)}
						<h2 className={styles.title}>{data.title}</h2>
					</div>
				);
		}
	};
	return (
		<NaviLab
			page={page as string}
			doc_id={data.doc_id}
			view={data.view as number}>
			<div className={styles.container}>
				{title()}
				<div className={styles.content}>{data.content}</div>
				<div className={styles.contnetInfoWrap}>
					<div className={styles.authorAndDateWrap}>
						<div>{data.user_name}</div>
						<div className={styles.dot}>●</div>
						<div>{getDate(data.created_at)}</div>
					</div>
					<div className={styles.activityCounters}>
						<div>좋아요 : {data.like_users.length}</div>
						<div>조회수 : {data.view}</div>
					</div>
				</div>
			</div>
		</NaviLab>
	);
}
