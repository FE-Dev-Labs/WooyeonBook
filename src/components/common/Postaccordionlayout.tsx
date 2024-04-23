import Image from 'next/image';
import styles from '@/styles/common/postaccordionlayout.module.css';
import PostaccordionLayoutFooter from './PostaccordionLayoutFooter';

interface postdataProps {
	list: any;
	page: string;
}
export default function Postaccordionlayout({ list, page }: postdataProps) {
	const titleChange = () => {
		switch (page) {
			case 'bookReport':
				return (
					<div className={styles.postdataWrapper}>
						<div className={styles.postWrapper}>
							{list.book_img_url ? (
								<div className={styles.postImgArea}>
									<Image
										className={styles.postImg}
										src={list.book_img_url}
										alt="메인이미지"
										width={200}
										height={200}
									/>
								</div>
							) : null}
							<div className={styles.postdataWrap}>
								<h3 className={styles.postTitle}>{list.title}</h3>
								<p className={styles.postReportContent}>{list.content}</p>
								<PostaccordionLayoutFooter list={list} />
							</div>
						</div>
					</div>
				);
			case 'bookMeeting':
				return (
					<div className={styles.postdataWrapper}>
						<div className={styles.postWrapper}>
							<div className={styles.postdataWrap}>
								{list.state ? (
									<div className={styles.contentState}>모집 완료</div>
								) : (
									<div className={styles.contentState}>모집중</div>
								)}
								<h3 className={styles.postTitle}>{list.title}</h3>
								<p className={styles.postContent}>{list.content}</p>
								<PostaccordionLayoutFooter list={list} />
							</div>
						</div>
					</div>
				);
			case 'bookBuying':
				return (
					<div className={styles.postdataWrapper}>
						<div className={styles.postWrapper}>
							{list.book_img_url ? (
								<div className={styles.postImgArea}>
									<Image
										className={styles.postImg}
										src={list.book_img_url}
										alt="메인이미지"
										width={200}
										height={200}
									/>
								</div>
							) : null}
							<div className={styles.postdataWrap}>
								{list.state ? (
									<div className={styles.contentState}>거래 완료</div>
								) : (
									<div className={styles.contentState}>거래중</div>
								)}
								<h3 className={styles.postTitle}>{list.title}</h3>
								<p className={styles.postContent}>{list.content}</p>
								<PostaccordionLayoutFooter list={list} />
							</div>
						</div>
					</div>
				);
			case 'bookSelling':
				return (
					<div className={styles.postdataWrapper}>
						<div className={styles.postWrapper}>
							{list.book_img_url ? (
								<div className={styles.postImgArea}>
									<Image
										className={styles.postImg}
										src={list.book_img_url}
										alt="메인이미지"
										width={200}
										height={200}
									/>
								</div>
							) : null}
							<div className={styles.postdataWrap}>
								{list.selling ? (
									<div className={styles.contentState}>나눔</div>
								) : (
									<div className={styles.contentState}>팝니다</div>
								)}
								<h3 className={styles.postTitle}>{list.title}</h3>
								<p className={styles.postContent}>{list.content}</p>
								<PostaccordionLayoutFooter list={list} />
							</div>
						</div>
					</div>
				);
			case 'likes':
				return (
					<div className={styles.postdataWrapper}>
						<div className={styles.postWrapper}>
							{list.book_img_url ? (
								<div className={styles.postImgArea}>
									<Image
										className={styles.postImg}
										src={list.book_img_url}
										alt="메인이미지"
										width={200}
										height={200}
									/>
								</div>
							) : null}
							<div className={styles.postdataWrap}>
								<h3 className={styles.postTitle}>{list.title}</h3>
								<p className={styles.postContent}>{list.content}</p>
								<PostaccordionLayoutFooter list={list} />
							</div>
						</div>
					</div>
				);
		}
	};
	return <div>{titleChange()}</div>;
}
