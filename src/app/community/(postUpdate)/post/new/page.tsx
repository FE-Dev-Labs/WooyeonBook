'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/community/post/postNewPage.module.css';
// dynamic import loading skeleton ui
const Select = dynamic(() => import('react-select'), {
	ssr: false,
	loading: () => (
		<div
			style={{
				width: '500px',
				height: '38px',
				backgroundColor: '#a5a5a5',
				borderRadius: '5px',
				marginRight: '50px',
			}}></div>
	),
});
const Editor = dynamic(
	() => import('@/components/community/post/WysiwygEditor'),
	{
		ssr: false,
		loading: () => (
			<div
				style={{
					width: '1300px',
					height: '601.25px',
					backgroundColor: '#a5a5a5',
					borderRadius: '5px',
				}}></div>
		),
	},
);
export default function postNewPage() {
	return (
		<div className={styles.container}>
			<div className={styles.header}>
				<div>📚</div>
				<h2>header 영역 입니다.</h2>
			</div>
			<input
				type="text"
				className={styles.title}
				placeholder="제목을 입력해주세요."
			/>
			<div className={styles.optionWrap}>
				<Select className={styles.bookSelectBtn} />
				<div>이 책이 맞나용?</div>
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
