'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/community/post/postNewPage.module.css';
// dynamic import loading skeleton ui
const Select = dynamic(() => import('react-select'), {
	ssr: false,
	loading: () => <p>로딩중...</p>,
});
const Editor = dynamic(
	() => import('@/components/community/post/WysiwygEditor'),
	{
		ssr: false,
		loading: () => <p>로딩중...</p>,
	},
);
export default function postNewPage() {
	return (
		<div className={styles.container}>
			<div className={styles.optionWrap}>
				<Select className={styles.bookSelectBtn} />
			</div>
			<div>
				<Editor />
			</div>
			<div className={styles.BtnWrap}>
				<button>취소</button>
				<button>등록</button>
			</div>
		</div>
	);
}
