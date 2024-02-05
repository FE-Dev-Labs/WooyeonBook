import styles from '@/styles/mypage/order/order.module.css';
// import imageCover from '../../../public/detail/bookImage.jpg';

import Myoderlist from './Myorderlist';

export default function Myorder() {
	return (
		<>
			<div className={styles.orderDateContainer}>
				<h1>2024년 1월 1일</h1>
			</div>
			<div className={styles.orderAccordionContainer}>
				<div className={styles.orderAccordionWrapper}>
					<ul className={styles.orderNav}>
						{/* <li>숫자</li> */}
						<li>상품 정보</li>
						<li>정가</li>
						<li>판매가</li>
						<li>수량</li>
						<li>합계</li>
					</ul>
					<Myoderlist />
				</div>
			</div>
		</>
	);
}
