import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import UsedBook from '@/components/main/usedBook/UsedBook';
import SignupModal from '@/components/auth/signup/SignupModal';
import LoginModal from '@/components/auth/login/LoginModal';
import BestSeller from '@/components/common/BestSeller';
import MainSlider from '@/components/main/mainSlider/MainSlider';

export default function Home() {
	return (
		<main className={styles.container}>
			{/* <RecentlyViewedBooks /> */}
			<div className={styles.wrapper}>
				<MainSlider />
				<NewBook />
				<ThemeRecommendation />
				<BestSeller />
				<UsedBook />
			</div>
			{/* <SignupModal /> */}
			{/* <LoginModal /> */}
		</main>
	);
}
