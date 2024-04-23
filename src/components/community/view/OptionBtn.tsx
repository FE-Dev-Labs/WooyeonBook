'use client';
import styles from '@/styles/community/search.module.css';
import dynamic from 'next/dynamic';
import { useEffect } from 'react';

const Select = dynamic(() => import('react-select'), {
	ssr: false,
	loading: () => <div className={styles.optionBtnSkeleton}></div>,
});

interface OptionBtnProps {
	pathName: string;
	onChangeSort?: (e: any) => void;
	onChangeCategories?: (e: any) => void;
}
const OptionBtn = ({
	pathName,
	onChangeSort,
	onChangeCategories,
}: OptionBtnProps) => {
	// 옵션 select
	const categoriesOption = () => {
		switch (pathName) {
			case 'bookReport':
				return [
					{ value: 'All', label: '전체' },
					{ value: 'true', label: '독후감' },
					{ value: 'false', label: '리뷰' },
				];
			case 'bookMeeting':
				return [
					{ value: 'All', label: '전체' },
					{ value: 'true', label: '모집중' },
					{ value: 'false', label: '모집완료' },
				];
			case 'bookBuying':
				return [
					{ value: 'All', label: '전체' },
					{ value: 'true', label: '거래중' },
					{ value: 'false', label: '거래완료' },
				];
			case 'bookSelling':
				return [
					{ value: 'All', label: '전체' },
					{ value: 'true', label: '나눔' },
					{ value: 'false', label: '팝니다' },
				];
			default:
				return [];
		}
	};
	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Oldest', label: '오래된 순' },
		{ value: 'View', label: '조회순' },
	];

	return (
		<>
			{pathName == 'bookReport' ? (
				<div className={styles.optionBtn}></div>
			) : (
				<Select
					className={styles.sortOptionBtn}
					options={categoriesOption()}
					defaultValue={categoriesOption()[0]}
					isSearchable={false}
					onChange={onChangeCategories}
				/>
			)}
			<Select
				className={styles.sortOptionBtn}
				options={sortOptions}
				defaultValue={sortOptions[0]}
				isSearchable={false}
				onChange={onChangeSort}
			/>
		</>
	);
};

export default OptionBtn;
