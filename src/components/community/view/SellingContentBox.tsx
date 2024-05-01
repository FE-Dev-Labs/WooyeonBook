import { BookSellingDataType } from '@/types/community/view/data';
import styles from '@/styles/community/contentBox.module.css';
import NaviLab from './nav/NaviLab';
import Image from 'next/image';
import PostAccordionLayoutFooter from '@/components/common/PostAccordionLayoutFooter';

interface ContentBoxProps {
	data: BookSellingDataType;
	page?: string;
}

const SellingContentBox = async ({ data, page }: ContentBoxProps) => {
	return (
		<NaviLab
			page={page as string}
			doc_id={data.doc_id as string}
			view={data.view as number}>
			<div className={styles.postdataWrapper}>
				<div className={styles.postWrapper}>
					{data.book_img_url ? (
						<div className={styles.postImgArea}>
							<Image
								className={styles.postImg}
								src={data.book_img_url}
								alt="책표지"
								width={200}
								height={200}
							/>
						</div>
					) : null}
					<div className={styles.postdataWrap}>
						{data.selling ? (
							<div className={styles.contentState}>팝니다</div>
						) : (
							<div className={styles.contentState}>나눔</div>
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

export default SellingContentBox;
