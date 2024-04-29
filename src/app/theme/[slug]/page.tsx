import styles from '@/styles/theme/artist/artist.module.css';
import { recommendedData } from '@/apis/theme/recommendedData';
import { RecommendedDataType } from '@/types/bookType';
import BookItem from '@/components/common/bookItem/BookItem';
import PageHeader from '@/components/common/PageHeader';

interface PageParams {
	params: {
		slug: string;
	};
}

export default function page({ params }: PageParams) {
	const data: RecommendedDataType = recommendedData.find(
		(item) => item.artistName === params.slug,
	) as RecommendedDataType;

	return (
		<>
			<PageHeader title={data.tag} isTheme={true} />
			<main className={styles.container}>
				<div className={styles.wrapper}>
					{data.book.map((book: any) => (
						<BookItem data={book} />
					))}
				</div>
			</main>
		</>
	);
}
