'use client';
import styles from '@/styles/common/communitynav.module.css';
import ControlFilterPanel from './ControlFilterPanel';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Communitynav() {

	const params = useSearchParams();
	const page = params.get('page');

	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<div className={styles.btnWrapper}>
					<Link
						href={'/mypage?page=bookReport'}
						className={
							page === 'bookReport'
								? styles.mypagePostBtnActive
								: styles.mypagePostBtn
						}>
						독후감
					</Link>
				</div>
				<div className={styles.btnWrapper}>
					<Link
						href={'/mypage?page=meeting'}
						className={
							page === 'meeting'
								? styles.mypagePostBtnActive
								: styles.mypagePostBtn
						}>
						모임
					</Link>
				</div>
				<div className={styles.btnWrapper}>
					<Link
						href={'/mypage?page=buyingBook'}
						className={
							page === 'buyingBook'
								? styles.mypagePostBtnActive
								: styles.mypagePostBtn
						}>
						삽니다
					</Link>
				</div>
				<div className={styles.btnWrapper}>
					<Link
						href={'/mypage?page=sellingBook'}
						className={
							page === 'sellingBook'
								? styles.mypagePostBtnActive
								: styles.mypagePostBtn
						}>
						팝니다
					</Link>
				</div>
				<div className={styles.btnWrapper}>
					<Link
						href={'/mypage?page=likes'}
						className={
							page === 'likes'
								? styles.mypagePostBtnActive
								: styles.mypagePostBtn
						}>
						찜한 목록
					</Link>
				</div>
			</div>
			<ControlFilterPanel />
		</div>
	);
}
// 'use client';
// import styles from '@/styles/common/communitynav.module.css';
// import { useState } from 'react';
// import ControlFilterPanel from './ControlFilterPanel';

// export default function Communitynav() {
// 	const [state, setState] = useState<string>('bookReport');
// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.wrapper}>
// 				<div className={styles.btnWrapper}>
// 					<button
// 						onClick={() => {
// 							setState('bookReport');
// 						}}
// 						className={
// 							state === 'bookReport'
// 								? styles.mypagePostBtnActive
// 								: styles.mypagePostBtn
// 						}>
// 						독후감
// 					</button>
// 				</div>
// 				<div className={styles.btnWrapper}>
// 					<button
// 						onClick={() => {
// 							setState('meeting');
// 						}}
// 						className={
// 							state === 'meeting'
// 								? styles.mypagePostBtnActive
// 								: styles.mypagePostBtn
// 						}>
// 						모임
// 					</button>
// 				</div>
// 				<div className={styles.btnWrapper}>
// 					<button
// 						onClick={() => {
// 							setState('buyingBook');
// 						}}
// 						className={
// 							state === 'buyingBook'
// 								? styles.mypagePostBtnActive
// 								: styles.mypagePostBtn
// 						}>
// 						삽니다
// 					</button>
// 				</div>
// 				<div className={styles.btnWrapper}>
// 					<button
// 						onClick={() => {
// 							setState('sellingBook');
// 						}}
// 						className={
// 							state === 'sellingBook'
// 								? styles.mypagePostBtnActive
// 								: styles.mypagePostBtn
// 						}>
// 						팝니다
// 					</button>
// 				</div>
// 				<div className={styles.btnWrapper}>
// 					<button
// 						onClick={() => {
// 							setState('likes');
// 						}}
// 						className={
// 							state === 'likes'
// 								? styles.mypagePostBtnActive
// 								: styles.mypagePostBtn
// 						}>
// 						찜한 목록
// 					</button>
// 				</div>
// 			</div>
// 			<ControlFilterPanel state={state} />
// 		</div>
// 	);
// }
