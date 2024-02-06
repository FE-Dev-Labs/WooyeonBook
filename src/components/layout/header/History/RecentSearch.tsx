import styles from '@/styles/layout/header/history/recentSearch.module.css';
import LastestWord from './LastestWord';
import HotWord from './HotWord';
import Image from 'next/image';
import cancelIcon from '../../../../../public/layout/cancel.png';
export default function RecentSearch() {
	return (
		<div className={styles.recentSearchContainer}>
			<div className={styles.recentSearchWrapper}>
				<LastestWord />
				<HotWord />
				<div className={styles.lastlestDeleteAll}>
					<span>검색기록 삭제</span>
					<Image src={cancelIcon} alt="cancelIcon" />
					<span>닫기</span>
				</div>
			</div>
		</div>
	);
}
