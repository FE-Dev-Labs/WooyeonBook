import Image from 'next/image';
import heartIcon from '../../../public/common/BsHeart.png';
import viewIcon from '../../../public/common/BsEye.png';
import chatIcon from '../../../public/common/BsChat.png';
import styles from '@/styles/common/postaccordionlayout.module.css';
import imageCover from '../../../public/detail/bookImage.jpg';
interface postdataProps {
	list: any;
}
export default function Postaccordionlayout({ list }: postdataProps) {
	return (
		<>
			<div className={styles.postWrapper}>
				{/*데이터 이미지 들어가는곳  */}
				<div className={styles.postImgArea}>
					<Image
						className={styles.postImg}
						src={imageCover}
						alt="메인이미지"
						width={50}
						height={70}
					/>
				</div>

				<div className={styles.postdataWrapper}>
					<h3 className={styles.postTitle}>{list.title}</h3>
					<p className={styles.postContent}>{list.content}</p>

					<div className={styles.postFooter}>
						<div className={styles.postIconWrapper}>
							<span>{list.user}</span>
							<span>&nbsp;·&nbsp; </span>
							<span>{list.time}</span>
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
