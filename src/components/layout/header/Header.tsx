import styles from '@/styles/layout//header/header.module.css';
import BottomWrappper from './bottomWrapper/BottomWrappper';
import MiddleWrapper from './middleWrapper/MiddleWrapper';
import TopWrapper from './topWrapper/TopWrapper';

export default function Header() {
	return (
		<header className={styles.container}>
			<div className={styles.wrapper}>
				<TopWrapper />
				<MiddleWrapper />
				<BottomWrappper />
			</div>
		</header>
	);
}
