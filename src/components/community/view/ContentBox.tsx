import styles from '@/styles/community/contentBox.module.css';
import { AllDataType } from '@/types/community/view/data';
import { getDate } from '@/utils/getDate';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import NaviLab from './nav/NaviLab';
interface ContentBoxProps {
	data: AllDataType;
	page?: string;
}

export default async function ContentBox({ data, page }: ContentBoxProps) {
	const viewCount = async () => {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);

		const { error } = await supabase
			.from(page as string)
			.update({
				view: (data?.view as number) + 1,
			})
			.eq('doc_id', data.doc_id)
			.select();

		if (error) {
			throw new Error('Error updating view count');
		}
	};
	return (
		<NaviLab
			page={page as string}
			doc_id={data.doc_id}
			view={data.view as number}>
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
		</NaviLab>
	);
}
