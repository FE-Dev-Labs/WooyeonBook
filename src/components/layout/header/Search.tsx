import styles from '@/styles/layout/header/search.module.css';
import Image from 'next/image';
import searchIcon from '../../../../public/common/search.png';
import RecentSearch from './History/RecentSearch';

export default function Search() {
	return (
		<form className={styles.searchForm}>
			<input type="text" placeholder="작가명 또는 책 제목을 입력하세요." />
			<button type="submit" className={styles.searchIcon}>
				<Image src={searchIcon} alt="searchIcon" width={20} height={20} />
			</button>
			<RecentSearch />
		</form>
	);
}
