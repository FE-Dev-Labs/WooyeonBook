import styles from '@/styles/layout//header/header.module.css';
import BottomWrappper from './bottomWrapper/BottomWrappper';
import MiddleWrapper from './middleWrapper/MiddleWrapper';
import TopWrapper from './topWrapper/TopWrapper';

export default function Header() {
	return (
		<header className={styles.container}>
			<main className={styles.wrapper}>
				<TopWrapper />
				<MiddleWrapper />
				<BottomWrappper />
			</main>
		</header>
	);
}
