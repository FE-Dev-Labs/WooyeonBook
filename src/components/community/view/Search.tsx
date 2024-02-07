'use client';
import Image from 'next/image';
import styles from '@/styles/community/search.module.css';
import searchIcon from '../../../../public/searchIcon.png';
import Link from 'next/link';
import { memo, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import communityPathname from '@/apis/communityPathname';
// 옵션 버튼
// 불필요하게 리렌더링이 되어서 밖으로 빼서 사용하는것을 채택 했습니다.
const Select = dynamic(() => import('react-select'), {
	ssr: false,
	loading: () => <div className={styles.optionBtnSkeleton}></div>,
});

interface OptionBtnProps {
	categoriesOption: { value: string; label: string }[];
	sortOptions: { value: string; label: string }[];
	pathName: string;
}

const OptionBtn = memo(
	({ categoriesOption, sortOptions, pathName }: OptionBtnProps) => (
		<>
			{pathName == 'bookReport' ? (
				<div className={styles.optionBtn}></div>
			) : (
				<Select
					className={styles.sortOptionBtn}
					options={categoriesOption}
					defaultValue={categoriesOption[0]}
					isSearchable={false}
				/>
			)}
			<Select
				className={styles.sortOptionBtn}
				options={sortOptions}
				defaultValue={sortOptions[0]}
				isSearchable={false}
			/>
		</>
	),
);

function Search() {
	const [query, setQuery] = useState('');
	const pathname = usePathname().split('/')[2];
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};
	// 옵션 select
	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Oldest', label: '오래된 순' },
		{ value: 'View', label: '조회순' },
	];

	const categoriesOption = () => {
		const pathname = communityPathname();
		if (pathname === 'meeting') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '모집중' },
				{ value: '3', label: '모집완료' },
			];
		}
		if (pathname === 'buyingBook') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '삽니다' },
				{ value: '3', label: '거래완료' },
			];
		}
		if (pathname === 'sellingBook') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '나눔' },
				{ value: '3', label: '팝니다' },
				{ value: '4', label: '판매완료' },
			];
		}
		return [];
	};
	return (
		<div className={styles.container}>
			<div className={styles.searchWrap}>
				<div className={styles.iconContainer}>
					<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
				</div>
				<input
					type="text"
					className={styles.searchInput}
					placeholder="검색어를 입력해주세요"
					onChange={onChange}
				/>
			</div>
			<Link className={styles.searchLink} href={`${pathname}?q=${query}`}>
				검색
			</Link>
			<OptionBtn
				categoriesOption={categoriesOption()}
				sortOptions={sortOptions}
				pathName={pathname}
			/>
		</div>
	);
}

export default Search;
