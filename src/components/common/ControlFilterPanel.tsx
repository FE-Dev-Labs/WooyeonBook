'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/common/controlfilterpanel.module.css';
import { usePathname, useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { mypage_QS } from '@/recoil/atom/mypageAtom';
import { useEffect, useState } from 'react';

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function ControlFilterPanel() {
	const params = useSearchParams();
	const page = params.get('page');
	const [qs, setQs] = useRecoilState(mypage_QS);

	const onChangeSort = (e: any) => {
		setQs({ ...qs, sort: e.value });
	};

	const onChangeCategories = (e: any) => {
		setQs({ ...qs, categories: e.value });
	};

	const onChangeHandler = (e: any) => {
		onChangeSort(e);
		onChangeCategories(e);
	};

	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Like', label: '인기순' },
		{ value: 'View', label: '조회순' },
	];

	const categoriesOption = () => {
		if (page === 'bookMeeting') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '모집중' },
				{ value: 'false', label: '모집완료' },
			];
		}
		if (page === 'bookBuying') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '삽니다' },
				{ value: 'false', label: '거래완료' },
			];
		}
		if (page === 'bookSelling') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '나눔' },
				{ value: 'false', label: '팝니다' },
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
					onChange={onChangeSort}
				/>

				{page === 'bookReport' ? null : (
					<Select
						className={styles.optionBtn}
						options={categoriesOption()}
						defaultValue={{ value: 'All', label: '전체' }}
						isSearchable={false}
						onChange={onChangeHandler}
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
