import dynamic from 'next/dynamic';
import styles from '@/styles/common/controlfilterpanel.module.css';
import { useRef, useEffect } from 'react';

interface controlProps {
	state: string;
}
export default function ControlFilterPanel({ state }: controlProps) {
	const Select = dynamic(() => import('react-select'), { ssr: false });

	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Like', label: '인기순' },
		{ value: 'View', label: '조회순' },
	];

	const categoriesByPageRef = useRef<{ value: string; label: string }[] | null>(
		null,
	);
	console.log(categoriesByPageRef);
	console.log(categoriesByPageRef.current);
	console.log('state', state);

	useEffect(() => {
		if (state === 'meeting') {
			categoriesByPageRef.current = [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '모집중' },
				{ value: '3', label: '모집완료' },
			];
		}
		if (state === 'buyingBook') {
			categoriesByPageRef.current = [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '삽니다' },
				{ value: '3', label: '거래완료' },
			];
		}
		if (state === 'sellingBook') {
			categoriesByPageRef.current = [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '나눔' },
				{ value: '3', label: '팝니다' },
				{ value: '4', label: '판매완료' },
			];
		}
		console.log('state', state);
		console.log('categoriesByPageRef.current', categoriesByPageRef.current);
		console.log('categoriesByPageRef', categoriesByPageRef);
	}, [state]);

	if (state === 'likes') {
		return null; // null을 반환하여 컴포넌트 자체를 렌더링하지 않도록 처리
	}

	return (
		<div className={styles.container}>
			<div className={styles.optionBtnWrap}>
				<Select
					className={styles.sortOptionBtn}
					options={sortOptions}
					defaultValue={sortOptions[0]}
					isSearchable={false}
				/>

				{state === 'bookReport' ? null : (
					<Select
						className={styles.optionBtn}
						options={categoriesByPageRef.current || []} // null 대신 빈 배열을 넣어줌
						defaultValue={{ value: 'All', label: '전체' }}
						isSearchable={false}
					/>
				)}
			</div>
		</div>
	);
}
