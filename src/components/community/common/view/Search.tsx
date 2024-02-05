'use client';
import Image from 'next/image';
import styles from '@/styles/community/search.module.css';
import searchIcon from '../../../../../public/searchIcon.png';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

function Search() {
	const Select = dynamic(() => import('react-select'), {
		ssr: false,
		loading: () => <div className={styles.optionBtnSkeleton}></div>,
	});
	const pathName = usePathname();
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
	const categoriesByPage = () => {
		const page = pathName.split('/')[2];
		if (page === 'meeting') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '모집중' },
				{ value: '3', label: '모집완료' },
			];
		}
		if (page === 'buyingBook') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '삽니다' },
				{ value: '3', label: '거래완료' },
			];
		}
		if (page === 'sellingBook') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '나눔' },
				{ value: '3', label: '팝니다' },
				{ value: '4', label: '판매완료' },
			];
		}
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
			<Select
				className={styles.sortOptionBtn}
				options={sortOptions}
				defaultValue={sortOptions[0]}
				isSearchable={false}
			/>
			<Select
				className={styles.sortOptionBtn}
				options={sortOptions}
				defaultValue={sortOptions[0]}
				isSearchable={false}
			/>
		</div>
	);
}

export default Search;
