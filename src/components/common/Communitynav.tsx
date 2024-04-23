'use client';
import styles from '@/styles/common/communitynav.module.css';
import ControlFilterPanel from './ControlFilterPanel';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { mypage_QS } from '@/recoil/atom/mypageAtom';
import { useRecoilState } from 'recoil';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Communitynav() {
	const params = useSearchParams();
	const page = params.get('page');
	const [qs, setQs] = useRecoilState(mypage_QS);
	const router = useRouter();
	useEffect(() => {
		// url 변경 될때 마다 실행
		if (page !== qs.page) {
			setQs((prevQs) => ({ ...prevQs, page: page ?? '' }));
		}
	}, [page, setQs]);

	useEffect(() => {
		const url = [];
		if (qs.page !== '') {
			url.push(`page=${qs.page}`);
		}
		if (qs.sort !== '') {
			url.push(`sort=${qs.sort}`);
		}
		if (qs.num !== '') {
			url.push(`num=${qs.num}`);
		}
		router.push('/mypage' + '?' + url.join('&'));
	}, [qs]);

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
						href={'/mypage?page=bookMeeting'}
						className={
							page === 'bookMeeting'
								? styles.mypagePostBtnActive
								: styles.mypagePostBtn
						}>
						모임
					</Link>
				</div>
				<div className={styles.btnWrapper}>
					<Link
						href={'/mypage?page=bookBuying'}
						className={
							page === 'bookBuying'
								? styles.mypagePostBtnActive
								: styles.mypagePostBtn
						}>
						삽니다
					</Link>
				</div>
				<div className={styles.btnWrapper}>
					<Link
						href={'/mypage?page=bookSelling'}
						className={
							page === 'bookSelling'
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
