'use client';
import Image from 'next/image';
import styles from '@/styles/community/search.module.css';
import searchIcon from '../../../../public/searchIcon.png';
import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { queryString } from '@/recoil/atom/queryString';
import OptionBtn from './OptionBtn';

function Search() {
	const router = useRouter();
	const [qs, setQs] = useRecoilState(queryString);

	const [query, setQuery] = useState('');
	const pathname = usePathname().split('/')[2];

	useEffect(() => {
		setQuery('');
		setQs({ q: '', sort: '', categories: '', num: '' });
	}, [pathname]);

	useEffect(() => {
		const url = [];
		if (qs.q !== '') {
			url.push(`q=${qs.q}`);
		}
		if (qs.sort !== '') {
			url.push(`sort=${qs.sort}`);
		}
		if (qs.categories !== '') {
			url.push(`categories=${qs.categories}`);
		}
		if (qs.num !== '') {
			url.push(`num=${qs.num}`);
		}
		router.push('/community/' + pathname + '?' + url.join('&'));
	}, [qs]);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
	};

	const onChangeSort = (e: any) => {
		setQs({ ...qs, sort: e.value });
	};

	const onChangeCategories = (e: any) => {
		setQs({ ...qs, categories: e.value });
	};

	const onChangeSearch = () => {
		setQs({ ...qs, q: query });
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
				pathName={pathname}
				onChangeSort={onChangeSort}
				onChangeCategories={onChangeCategories}
			/>
		</div>
	);
}

export default Search;
