import styles from '@/styles/community/contentBox.module.css';
import { AllDataType } from '@/types/community/view/data';
import NaviLab from './nav/NaviLab';
import Image from 'next/image';
import PostAccordionLayoutFooter from '@/components/common/PostAccordionLayoutFooter';
interface ContentBoxProps {
	data: AllDataType;
	page?: string;
}

export default async function ContentBox({ data, page }: ContentBoxProps) {
	const title = () => {
		switch (page) {
			case 'bookReport':
				return (
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
								<h3 className={styles.postTitle}>{data.title}</h3>
								<p className={styles.postReportContent}>{data.content}</p>
								<PostAccordionLayoutFooter list={data} />
							</div>
						</div>
					</div>
				);
			case 'bookMeeting':
				return (
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
				);
			case 'bookBuying':
				return (
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
								{data.state ? (
									<div className={styles.contentState}>거래 완료</div>
								) : (
									<div className={styles.contentState}>거래중</div>
								)}
								<h3 className={styles.postTitle}>{data.title}</h3>
								<p className={styles.postContent}>{data.content} </p>
								<PostAccordionLayoutFooter list={data} />
							</div>
						</div>
					</div>
				);
			case 'bookSelling':
				return (
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
				);
		}
	};

	return (
		<NaviLab
			page={page as string}
			doc_id={data.doc_id as string}
			view={data.view as number}>
			{title()}
		</NaviLab>
	);
}
