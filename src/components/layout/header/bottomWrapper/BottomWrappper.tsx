import styles from '@/styles/layout/header/bottomWrapper/bottomWrapper.module.css';
import Nav from './nav/Nav';
import Search from './search/Search';

export default function BottomWrappper() {
	return (
		<div className={styles.bottomWrapper}>
			<Nav />
			<Search />
		</div>
	);
}
