'use client';
import styles from '@/styles/layout/header/history/recentSearch.module.css';
import LastestWord from './LastestWord';
import HotWord from './HotWord';
import Image from 'next/image';
import cancelIcon from '../../../../../public/layout/cancel.png';
import { RefObject } from 'react';
interface RecentSearchProps {
	ref: RefObject<HTMLDivElement>;
}
export default function RecentSearch({ ref }: RecentSearchProps) {
	return (
		<div className={styles.recentSearchContainer} ref={ref}>
			<div className={styles.recentSearchWrapper}>
				<LastestWord />
				<HotWord />
				<div className={styles.lastlestDeleteAll}>
					<span className={styles.lastelestDeleteAllText}>검색기록 삭제</span>
					<div className={styles.lastlestCloseWrap}>
						<span className={styles.lastelestCloseText}>닫기</span>
						<Image
							src={cancelIcon}
							alt="cancelIcon"
							width={10}
							height={10}
							className={styles.cancelIcon}
						/>
					</div>
				</div>
			</div>
		</div>
	);
}
