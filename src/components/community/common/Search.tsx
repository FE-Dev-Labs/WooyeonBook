'use client';
import Image from 'next/image';
import styles from '@/styles/community/search.module.css';
import searchIcon from '../../../../public/searchIcon.png';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

function Search() {
	const [query, setQuery] = useState('');
	const pathname = usePathname().split('/')[2];
	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setQuery(e.target.value);
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
		</div>
	);
}

export default Search;
