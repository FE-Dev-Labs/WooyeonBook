import { AllDataType } from '@/types/community/view/data';
import BookReport from '@/components/community/detail/BookReport';
import BookMeeting from '@/components/community/detail/BookMeeting';
import BookBuying from '@/components/community/detail/BookBuying';
import BookSelling from '@/components/community/detail/BookSelling';
import styles from '@/styles/community/detail/DetailLayout.module.css';
import LikeBtn from '@/components/community/detail/LikeBtn';

export default async function DetailPage({
	params,
	searchParams,
}: {
	params: { page: string; doc_id: string };
	searchParams?: { sort?: string };
}) {
	const response = await fetch(
		`http://localhost:8080/community/${params.page}/${params.doc_id}`,
		{
			cache: 'no-store',
		},
	);
	const data: AllDataType = await response.json();

	const page = () => {
		switch (params.page) {
			case 'bookReport':
				return <BookReport data={data} searchParams={searchParams} />;
			case 'bookSelling':
				return <BookSelling data={data} searchParams={searchParams} />;
			case 'bookMeeting':
				return <BookMeeting data={data} searchParams={searchParams} />;
			case 'bookBuying':
				return <BookBuying data={data} searchParams={searchParams} />;
			default:
				null;
		}
	};

	return (
		<div className={styles.container}>
			<aside></aside>
			<article className={styles.mainWrap}>{page()}</article>
			<aside className={styles.optionWrap}>
				<LikeBtn
					page={params.page}
					doc_id={params.doc_id}
					like={data.like_users}
				/>
				<button>공유</button>
			</aside>
		</div>
	);
}
