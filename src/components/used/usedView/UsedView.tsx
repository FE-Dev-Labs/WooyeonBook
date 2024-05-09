import BestSeller from '@/components/common/BestSeller';
import CategoryBox from '@/components/common/CategoryBox';
import Pagination from '@/components/common/Pagination';
import BookItemWrapper from '@/components/common/bookItem/BookItemWrapper';
import RecentlyViewedBooks from '@/components/layout/RecentlyViewedBooks';
import styles from '@/styles/used/usedView/usedView.module.css';
import { BestSellerType, UsedBookType } from '@/types/bookType';

interface usedViewProps {
	categoryId: string;
	data: UsedBookType[];
	dataLength: number;
	usedBestData: BestSellerType[];
}

export default function UsedView({
	categoryId,
	data,
	dataLength,
	usedBestData,
}: usedViewProps) {
	return (
		<div className={styles.container}>
			<aside />
			<main className={styles.wrapper}>
				<BestSeller page="used" isUsedPage={true} data={usedBestData} />
				<div className={styles.usedLine} />
				<CategoryBox categoryId={categoryId} />
				<BookItemWrapper data={data} />
				<Pagination
					dataLength={dataLength}
					page="used"
					categoryId={categoryId}
				/>
			</main>
			<aside>
				<RecentlyViewedBooks />
			</aside>
		</div>
	);
}
