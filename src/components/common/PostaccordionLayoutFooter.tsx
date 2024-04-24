import styles from '@/styles/common/postaccordionlayout.module.css';
import Image from 'next/image';
import heartIcon from '../../../public/common/BsHeart.png';
import viewIcon from '../../../public/common/BsEye.png';
import { getDate } from './../../utils/getDate';

interface postdataProps {
	list: any;
}

export default function PostAccordionLayoutFooter({ list }: postdataProps) {
	// 숫자가 문자열로 넘어옴 객체로 변환해서 toLocalDateString()메소드를 사용할 수 변환
	const listdate = new Date(list.created_at);

	return (
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
						<span className={styles.postDataNumber}>
							{list.like_users.length}
						</span>
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
				</dl>
			</div>
		</div>
	);
}
