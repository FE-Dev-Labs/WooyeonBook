import styles from '@/styles/common/sortBar.module.css';
// import { sortTypeAtom } from '@/recoil/atom/sortTypeAtom';
// import { useRecoilState } from 'recoil';
// import { useRouter } from 'next/navigation';
// import { usePathname } from 'next/navigation';

interface SortBarProp {
	categoryId?: string;
	keyword?: any;
	page: string;
	dataLength?: number | null;
}

export default function SortBar({
	categoryId,
	keyword,
	page,
	dataLength,
}: SortBarProp) {
	// // sort type state
	// const [sortType, setSortType] = useRecoilState(sortTypeAtom);
	// // useRouter 호출
	// const router = useRouter();
	// // usePathname 호출
	// const pathname = usePathname();

	// // 소팅 아이템 선택시 동작하는 함수
	// const handleSortTypeChange = async (sortType: string) => {
	// 	// 소팅 아이템 변경
	// 	setSortType(sortType);
	// 	// 라우터 변경
	// 	page === 'category' &&
	// 		router.push(`${pathname}?categoryId=${categoryId}&sortType=${sortType}`);
	// 	page === 'search' &&
	// 		router.push(`${pathname}?keyword=${keyword}&sortType=${sortType}`);
	// };

	return (
		<section className={styles.sortBox}>
			{page === 'category' && <div style={{ visibility: 'hidden' }} />}
			{page === 'search' && (
				<div className={styles.amountBox}>상품 ({dataLength})</div>
			)}
			{/* <div className={styles.textBox}>
				<p
					className={`${sortType === 'title' && styles.selectedSortItem}`}
					onClick={() => handleSortTypeChange('title')}>
					제목순
				</p>
				<p
					className={`${sortType === 'earliest' && styles.selectedSortItem}`}
					onClick={() => handleSortTypeChange('earliest')}>
					최신순
				</p>
			</div> */}
		</section>
	);
}
