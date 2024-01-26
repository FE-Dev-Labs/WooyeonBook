import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import BestSeller from '@/components/main/bestSeller/BestSeller';
import UsedBook from '@/components/main/usedBook/UsedBook';
import ImageSlider from '@/components/main/imageSlider/ImageSlider';
import SignupModal from '@/components/auth/signup/SignupModal';
import LoginModal from '@/components/auth/login/LoginModal';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<ImageSlider />
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
