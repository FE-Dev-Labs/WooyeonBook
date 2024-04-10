import Image from 'next/image';
import heartIcon from '../../../public/common/BsHeart.png';
import viewIcon from '../../../public/common/BsEye.png';
import chatIcon from '../../../public/common/BsChat.png';
import styles from '@/styles/common/postaccordionlayout.module.css';
import { getDate } from './../../utils/getDate';

interface postdataProps {
	list: any;
}
export default function Postaccordionlayout({ list }: postdataProps) {
	console.log(list);
	// 숫자가 문자열로 넘어옴 객체로 변환해서 toLocalDateString()메소드를 사용할 수 변환
	const listdate = new Date(list.created_at);
	return (
		<>
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

				<div className={styles.postdataWrapper}>
					<h3 className={styles.postTitle}>{list.title}</h3>
					<p className={styles.postContent}>{list.content}</p>

					<div className={styles.postFooter}>
						<div className={styles.postIconWrapper}>
							<span>{list.user_name}</span>
							<span>&nbsp;·&nbsp; </span>
							<span>{getDate(listdate)}</span>
						</div>
						<div className={styles.postIconWrapper}>
							<dl>
								<dt className={styles.iconText}>좋아요</dt>
								<dd className={styles.icondd}>
									<Image
										src={heartIcon}
										alt="heartIcon"
										width={20}
										height={20}
										className={styles.iconsStyle}
									/>
									<span className={styles.postDataNumber}>{list.like}</span>
								</dd>
								<dt className={styles.iconText}>조회수</dt>
								<dd className={styles.icondd}>
									<Image
										src={viewIcon}
										alt="viewIcon"
										width={20}
										height={20}
										className={styles.iconsStyle}
									/>
									<span className={styles.postDataNumber}>{list.view}</span>
								</dd>
								<dt className={styles.iconText}>댓글</dt>
								<dd className={styles.icondd}>
									<Image
										src={chatIcon}
										alt="chatIcon"
										width={20}
										height={20}
										className={styles.iconsStyle}
									/>
									<span className={styles.postDataNumber}>{list.comments}</span>
								</dd>
							</dl>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
