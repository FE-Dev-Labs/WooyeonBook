'use client';

import styles from '@/styles/community/post/OptionBookSelling.module.css';
import BookSearch from '../BookSearch';
import dynamic from 'next/dynamic';
import { useRecoilValue } from 'recoil';
import { book_name } from '@/recoil/atom/bookIdAtom';

interface OptionBookSellingProps {
	sellingPrice: {
		value: string;
		onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	};
	onchangeSellingState: (e: any) => void;
}

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

const OptionBookSelling = ({
	sellingPrice,
	onchangeSellingState,
}: OptionBookSellingProps) => {
	const bookName = useRecoilValue(book_name);

	const sellingStateOptions = [
		{ value: '', label: '판매 / 나눔' },
		{ value: '판매', label: '판매' },
		{ value: '나눔', label: '나눔' },
	];
	return (
		<div className={styles.sellingSelectContainer}>
			<div className={styles.sellingSelectWrap}>
				<label>책을 선택해주세요.</label>
				<BookSearch />
			</div>
			<div className={styles.sellingSelectWrap}>
				<label>선택한 책</label>
				<div className={styles.selectBookText}>{bookName}</div>
			</div>
			<div className={styles.sellingSelectWrap}>
				<label>판매하고 싶은 가격을 적어주세요.</label>
				<input
					type="text"
					value={sellingPrice.value as string}
					onChange={sellingPrice.onChange}
				/>
			</div>

			<div className={styles.sellingSelectWrap}>
				<label>판매 / 나눔</label>
				<Select
					className={styles.bookSelectBtn}
					options={sellingStateOptions}
					defaultValue={sellingStateOptions[0]}
					onChange={onchangeSellingState}
				/>
			</div>
		</div>
	);
};

export default OptionBookSelling;
