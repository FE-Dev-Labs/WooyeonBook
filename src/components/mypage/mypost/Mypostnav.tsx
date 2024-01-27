import styles from '@/styles/mypage/mypost/mypost.module.css';
import { useState } from 'react';

export default function Mypostnav() {
	const [state, setState] = useState<string>('bookReport');
	return (
		<div className={styles.container}>
			<div className={styles.btnWrapper}>
				<button
					onClick={() => {
						setState('bookReport');
					}}
					className={
						state === 'bookReport'
							? styles.mypagePostBtnActive
							: styles.mypagePostBtn
					}>
					독후감
				</button>
			</div>
			<div className={styles.btnWrapper}>
				<button
					onClick={() => {
						setState('meeting');
					}}
					className={
						state === 'meeting'
							? styles.mypagePostBtnActive
							: styles.mypagePostBtn
					}>
					모임
				</button>
			</div>
			<div className={styles.btnWrapper}>
				<button
					onClick={() => {
						setState('buyingBook');
					}}
					className={
						state === 'buyingBook'
							? styles.mypagePostBtnActive
							: styles.mypagePostBtn
					}>
					삽니다
				</button>
			</div>
			<div className={styles.btnWrapper}>
				<button
					onClick={() => {
						setState('sellingBook');
					}}
					className={
						state === 'sellingBook'
							? styles.mypagePostBtnActive
							: styles.mypagePostBtn
					}>
					팝니다
				</button>
			</div>
		</div>
	);
}
