import { AllDataType } from '@/types/community/view/data';
import styles from '@/styles/community/detail/DetailPage.module.css';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { getDate } from '@/utils/getDate';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
interface BookSellingProps {
	data: AllDataType;
}
const View = dynamic(() => import('@/components/common/Viewer'), {
	ssr: false,
});

const BookSelling = async ({ data }: BookSellingProps) => {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>{data.title}</h2>
			<div className={styles.infoWrap}>
				<div className={styles.contentInfoWrap}>
					<div>{getDate(data.created_at)}</div>
					<div className={styles.dot}>●</div>
					<div>조회수 : {data.view}</div>
					<div className={styles.dot}>●</div>
					<div>좋아요 : {data.like} </div>
				</div>
				{data?.created_user === user?.id ? (
					<div className={styles.adimBtnWrap}>
						<Link href={`/community/update/bookSelling/${data.doc_id}`}>
							수정
						</Link>
						<button>삭제</button>
					</div>
				) : null}
			</div>
			<hr className={styles.line} />
			{/* option */}
			<section className={styles.optionContainer}>
				<div className={styles.optionItemWrap}>
					<label className={styles.optionItemTitle}>판매 / 나눔</label>
					<div className={styles.optionItemContent}>
						{data.selling ? '판매' : '나눔'}
					</div>
				</div>
				<div className={styles.optionItemWrap}>
					<label className={styles.optionItemTitle}>판매하는 책</label>
					<div className={styles.optionItemContent}>{data.book_name}</div>
				</div>
				<div className={styles.optionItemWrap}>
					<label className={styles.optionItemTitle}>희망 판매 가격</label>
					<div className={styles.optionItemContent}>{data.price} 원</div>
				</div>
				<hr className={styles.line} />
			</section>
			{/* editor */}
			<div className={styles.viewerWrap}>
				<View content={data.content} />
			</div>
		</section>
	);
};

export default BookSelling;
