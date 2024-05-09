import Image from 'next/image';
import styles from '@/styles/common/postAccordionLayout.module.css';
import PostAccordionLayoutFooter from './PostAccordionLayoutFooter';
import NaviLab from '../community/view/nav/NaviLab';

interface postdataProps {
	list: any;
	page: string;
}

// 'likes' 페이지일 경우 'page' 값을 'list.field'로 변경
const likesPage = ({ list, page }: postdataProps) => {
	if (page === 'likes') {
		return list.field;
	}
	return page;
};

export default function PostAccordionLayout({ list, page }: postdataProps) {
	const newPage = likesPage({ list, page });
	const titleChange = () => {
		switch (newPage) {
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
								<PostAccordionLayoutFooter list={list} />
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
								<PostAccordionLayoutFooter list={list} />
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
								<PostAccordionLayoutFooter list={list} />
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
								<PostAccordionLayoutFooter list={list} />
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
								<PostAccordionLayoutFooter list={list} />
							</div>
						</div>
					</div>
				);
		}
	};

	return (
		<NaviLab
			page={newPage as string}
			doc_id={list.doc_id}
			view={list.view as number}>
			{titleChange()}
		</NaviLab>
	);
}
