'use client';
import styles from '@/styles/community/post/OptionBookReport.module.css';
import BookSearch from '../BookSearch';
import { useRecoilValue } from 'recoil';
import { book_name } from '@/recoil/atom/bookIdAtom';

const OptionBookReport = () => {
	const bookName = useRecoilValue(book_name);
	return (
		<div className={styles.reportSelectContainer}>
			<div className={styles.reportSelectWrap}>
				<label>책을 선택해주세요.</label>
				<BookSearch />
			</div>
			<div className={styles.reportSelectWrap}>
				<label>선택한 책</label>
				<div className={styles.selectBookText}>{bookName}</div>
			</div>
		</div>
	);
};

export default OptionBookReport;
