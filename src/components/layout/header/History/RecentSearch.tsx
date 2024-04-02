import styles from '@/styles/layout/header/history/recentSearch.module.css';
import LastestWord from './LastestWord';
import HotWord from './HotWord';
import Image from 'next/image';
import cancelIcon from '../../../../../public/layout/cancel.png';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import useModal from '@/hooks/useModal';

export default function RecentSearch() {
	// 최근 검색어 로컬스토리지 지우는 로직
	const { storedValue, removeAllKeywords } = useLocalStorage(
		'searchKeywords',
		[],
	);
	// useModal 훅
	const { handleModalStateChange } = useModal(false);

	return (
		<div className={styles.recentSearchContainer}>
			<div className={styles.recentSearchWrapper}>
				<LastestWord />
				<HotWord />
				<div
					className={styles.lastlestDeleteAllWrap}
					style={{
						justifyContent:
							storedValue.length === 0 ? 'flex-end' : 'space-between',
					}}>
					{storedValue.length ? (
						<div
							className={styles.lastlestDeleteAll}
							onMouseDown={() => removeAllKeywords()}>
							<span className={styles.lastelestDeleteAllText}>
								검색기록 삭제
							</span>
						</div>
					) : (
						<></>
					)}
					<div
						className={styles.lastlestCloseWrap}
						onMouseDown={() => handleModalStateChange()}>
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
