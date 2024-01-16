import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/main/main.module.css';
import CategoryTitle from '../components/main/common/CategoryTitle';
import BookItemBox from '@/components/main/common/BookItemBox';
import bookImage from '../../public/main/book2.jpg';
import Image from 'next/image';
import Link from 'next/link';
import NewBook from '../components/main/newBook/NewBook';
import ThemeRecommendation from '@/components/main/themeRecommendation/ThemeRecommendation';
import BookItem from '@/components/common/BookItem';
import BestSeller from '@/components/main/bestSeller/BestSeller';
import UsedBook from '@/components/main/usedBook/UsedBook';

export default function Home() {
	return (
		<main className={styles.container}>
			<RecentlyViewedBooks />
			<div className={styles.wrapper}>
				<NewBook />
				<ThemeRecommendation />
				<BestSeller />
				<UsedBook />
			</div>
		</main>
	);
}
