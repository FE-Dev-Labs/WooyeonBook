import styles from '@/styles/mypage/order/orderlist.module.css';
import imageCover from '../../../../public/detail/bookImage.jpg';
import Image from 'next/image';

export default function MyOderList() {
	return (
		<>
			<div className={styles.orderWrapper}>
				<div className={styles.orderNumber}>
					<span>1</span>
				</div>
				<div className={styles.orderImgArea}>
					<Image
						className={styles.orderImg}
						src={imageCover}
						alt="메인이미지"
						width={50}
						height={70}
					/>

					<div className={styles.orderdataWrapper}>
						<h3 className={styles.orderTitle}>베르베르씨, 오늘은 뭘 쓰세요?</h3>

						<div className={styles.orderFooter}>
							<div className={styles.orderIconWrapper}>
								<span>베르베르씨</span>
								<span>&nbsp;·&nbsp; </span>
								<span>전미화 옮김</span>
							</div>
						</div>
					</div>
				</div>
				{/* <div className={styles.orderIconWrapper}> */}
				<span>20,000원</span>
				<span>20,000원</span>
				<span>1개</span>
				<span>36,000원</span>
				<button className={styles.orderCancleBtn}>주문취소</button>
				{/* <dl>
								<dt className={styles.iconText}>좋아요</dt>
								<dd className={styles.icondd}>
									<span className={styles.orderDataNumber}>20,000원</span>
								</dd>
								<dt className={styles.iconText}>조회수</dt>
								<dd className={styles.icondd}>
									<span className={styles.orderDataNumber}>18,000원</span>
								</dd>
								<dt className={styles.iconText}>댓글</dt>
								<dd className={styles.icondd}>
									<span className={styles.orderDataNumber}>1</span>
								</dd>
							</dl> */}
				{/* </div> */}
			</div>
		</>
	);
}
