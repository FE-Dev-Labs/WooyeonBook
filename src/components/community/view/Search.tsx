'use client';
import Image from 'next/image';
import styles from '@/styles/community/search.module.css';
import searchIcon from '../../../../public/searchIcon.png';
import { memo, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import communityPathname from '@/apis/communityPathname';
import { useRouter, useSearchParams } from 'next/navigation';

const Select = dynamic(() => import('react-select'), {
	ssr: false,
	loading: () => <div className={styles.optionBtnSkeleton}></div>,
});

interface OptionBtnProps {
	categoriesOption: { value: string; label: string }[];
	sortOptions: { value: string; label: string }[];
	pathName: string;
	onChangeSort?: (e: any) => void;
	onChangeCategories?: (e: any) => void;
}

const OptionBtn = memo(
	({
		categoriesOption,
		sortOptions,
		pathName,
		onChangeSort,
		onChangeCategories,
	}: OptionBtnProps) => (
		<>
			{pathName == 'bookReport' ? (
				<div className={styles.optionBtn}></div>
			) : (
				<Select
					className={styles.sortOptionBtn}
					options={categoriesOption}
					defaultValue={categoriesOption[0]}
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
	),
);

function Search() {
	const params = useSearchParams();
	const router = useRouter();
	const [url, setUrl] = useState('');
	const [query, setQuery] = useState('');
	const [sort, setSort] = useState('');
	const [categories, setCategories] = useState('');
	const pathname = usePathname().split('/')[2];
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	useEffect(() => {
		setQuery('');
	}, [pathname]);
	useEffect(() => {
		setUrl(window.location.href);
	}, []);
	const onChangeSort = (e: any) => {
		setSort(e.value);
		if (
			(params.has('sort') && params.get('sort') !== '') ||
			(params.has('categories') && params.get('categories') !== '')
		) {
			return router.push(`${url}&sort=${e.value}`);
		} else {
			return router.push(`/community/${pathname}?sort=${e.value}`);
		}
	};
	const onChangeCategories = (e: any) => {
		setCategories(e.value);
		if (
			(params.has('q') && params.get('q') !== '') ||
			(params.has('sort') && params.get('sort') !== '')
		) {
			return router.push(`${url}&categories=${e.value}`);
		} else {
			return router.push(`${url}?categories=${e.value}`);
		}
	};
	const onChangeSearch = () => {
		if (params.has('sort') || params.has('categories')) {
			return router.push(`${url}&q=${query}`);
		} else {
			return router.push(`${url}?q=${query}`);
		}
	};
	// 옵션 select
	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Oldest', label: '오래된 순' },
		{ value: 'View', label: '조회순' },
	];

	const categoriesOption = () => {
		const pathname = communityPathname();
		if (pathname === 'bookMeeting') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '모집중' },
				{ value: 'false', label: '모집완료' },
			];
		}
		if (pathname === 'bookBuying') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '거래중' },
				{ value: 'false', label: '거래완료' },
			];
		}
		if (pathname === 'bookSelling') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '나눔' },
				{ value: 'false', label: '팝니다' },
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
					value={query}
					className={styles.searchInput}
					placeholder="검색어를 입력해주세요"
					onChange={onChange}
				/>
			</div>
			<button className={styles.searchLink} onClick={onChangeSearch}>
				검색
			</button>
			<OptionBtn
				categoriesOption={categoriesOption()}
				sortOptions={sortOptions}
				pathName={pathname}
				onChangeSort={onChangeSort}
				onChangeCategories={onChangeCategories}
			/>
		</div>
	);
}

export default Search;
