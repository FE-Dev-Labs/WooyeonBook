import ThemeHeader from '@/components/theme/ThemeHeader';
import { recommendedData } from '@/apis/theme/recommendedData';
import styles from '@/styles/theme/artist/artist.module.css';
import BookItem from '@/components/common/BookItem';
import { RecommendedDataType } from '@/types/bookType';

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
		<div>
			<ThemeHeader title={data.tag} color={data.color} image={data.image} />
			<div className={styles.container}>
				<div className={styles.wrapper}>
					{data.book.map((book: any) => (
						<BookItem data={book} />
					))}
				</div>
			</div>
		</div>
	);
}
