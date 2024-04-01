'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/common/controlfilterpanel.module.css';
import { useSearchParams } from 'next/navigation';

const Select = dynamic(() => import('react-select'), { ssr: false });
export default function ControlFilterPanel() {
	const params = useSearchParams();
	const page = params.get('page');

	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Like', label: '인기순' },
		{ value: 'View', label: '조회순' },
	];
	const categoriesByPage = () => {
		if (page === 'bookMeeting') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '모집중' },
				{ value: '3', label: '모집완료' },
			];
		}
		if (page === 'bookBuying') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '삽니다' },
				{ value: '3', label: '거래완료' },
			];
		}
		if (page === 'bookSelling') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '나눔' },
				{ value: '3', label: '팝니다' },
				{ value: '4', label: '판매완료' },
			];
		}
	};

	if (page === 'likes') {
		return null; // null을 반환하여 컴포넌트 자체를 렌더링하지 않도록 처리
	}

	return (
		<div className={styles.container}>
			<div className={styles.optionBtnWrap}>
				<Select
					className={styles.sortOptionBtn}
					options={sortOptions}
					defaultValue={sortOptions[0]}
					isSearchable={false}
				/>

				{page === 'bookReport' ? null : (
					<Select
						className={styles.optionBtn}
						options={categoriesByPage()}
						defaultValue={{ value: 'All', label: '전체' }}
						isSearchable={false}
					/>
				)}
			</div>
		</div>
	);
}
// import dynamic from 'next/dynamic';
// import styles from '@/styles/common/controlfilterpanel.module.css';

// interface controlProps {
// 	state: string;
// }
// const Select = dynamic(() => import('react-select'), { ssr: false });
// export default function ControlFilterPanel({ state }: controlProps) {
// 	console.log('state변경', state);
// 	const sortOptions = [
// 		{ value: 'Latest', label: '최신순' },
// 		{ value: 'Like', label: '인기순' },
// 		{ value: 'View', label: '조회순' },
// 	];
// 	const categoriesByPage = () => {
// 		if (state === 'meeting') {
// 			return [
// 				{ value: 'All', label: '전체' },
// 				{ value: '2', label: '모집중' },
// 				{ value: '3', label: '모집완료' },
// 			];
// 		}
// 		if (state === 'buyingBook') {
// 			return [
// 				{ value: 'All', label: '전체' },
// 				{ value: '2', label: '삽니다' },
// 				{ value: '3', label: '거래완료' },
// 			];
// 		}
// 		if (state === 'sellingBook') {
// 			return [
// 				{ value: 'All', label: '전체' },
// 				{ value: '2', label: '나눔' },
// 				{ value: '3', label: '팝니다' },
// 				{ value: '4', label: '판매완료' },
// 			];
// 		}
// 	};

// 	if (state === 'likes') {
// 		return null; // null을 반환하여 컴포넌트 자체를 렌더링하지 않도록 처리
// 	}

// 	return (
// 		<div className={styles.container}>
// 			<div className={styles.optionBtnWrap}>
// 				<Select
// 					className={styles.sortOptionBtn}
// 					options={sortOptions}
// 					defaultValue={sortOptions[0]}
// 					isSearchable={false}
// 				/>

// 				{state === 'bookReport' ? null : (
// 					<Select
// 						className={styles.optionBtn}
// 						options={categoriesByPage()}
// 						defaultValue={{ value: 'All', label: '전체' }}
// 						isSearchable={false}
// 					/>
// 				)}
// 			</div>
// 		</div>
// 	);
// }
