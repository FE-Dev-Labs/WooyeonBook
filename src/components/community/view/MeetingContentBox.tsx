import { BookMeetingDataType } from '@/types/community/view/data';
import styles from '@/styles/community/contentBox.module.css';
import NaviLab from './nav/NaviLab';
import PostAccordionLayoutFooter from '@/components/common/PostAccordionLayoutFooter';

interface ContentBoxProps {
	data: BookMeetingDataType;
	page?: string;
}

const MeetingContentBox = async ({ data, page }: ContentBoxProps) => {
	return (
		<NaviLab
			page={page as string}
			doc_id={data.doc_id as string}
			view={data.view as number}>
			<div className={styles.postdataWrapper}>
				<div className={styles.postWrapper}>
					<div className={styles.postdataWrap}>
						{data.state ? (
							<div className={styles.contentState}>모집 완료</div>
						) : (
							<div className={styles.contentState}>모집중</div>
						)}
						<h3 className={styles.postTitle}>{data.title}</h3>
						<p className={styles.postContent}>{data.content}</p>
						<PostAccordionLayoutFooter list={data} />
					</div>
				</div>
			</div>
		</NaviLab>
	);
};

export default MeetingContentBox;
