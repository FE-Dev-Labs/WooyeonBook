import styles from '@/styles/theme/artist/artist.module.css';
import { recommendedData } from '@/apis/theme/recommendedData';
import { RecommendedDataType } from '@/types/bookType';
import BookItem from '@/components/common/bookItem/BookItem';
import PageHeader from '@/components/common/PageHeader';
import { Metadata } from 'next';

interface ThemePageProps {
	params: {
		slug: string;
	};
}

export async function generateMetadata({
	params,
}: ThemePageProps): Promise<Metadata> {
	const data = recommendedData.find(
		(item) => item.artistName === params.slug,
	) as RecommendedDataType;
	return {
		title: `${data.tag}의 추천 도서 | Wooyeon`,
		description: `${data.tag}의 추천 도서.`,
	};
}

export default function page({ params }: ThemePageProps) {
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
