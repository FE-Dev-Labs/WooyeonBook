import dynamic from 'next/dynamic';
import styles from '@/styles/common/controlfilterpanel.module.css';

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
	const categoriesByPage = () => {
		if (state === 'meeting') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '모집중' },
				{ value: '3', label: '모집완료' },
			];
		}
		if (state === 'buyingBook') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '삽니다' },
				{ value: '3', label: '거래완료' },
			];
		}
		if (state === 'sellingBook') {
			return [
				{ value: 'All', label: '전체' },
				{ value: '2', label: '나눔' },
				{ value: '3', label: '팝니다' },
				{ value: '4', label: '판매완료' },
			];
		}
	};

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
						options={categoriesByPage()}
						defaultValue={{ value: 'All', label: '전체' }}
						isSearchable={false}
					/>
				)}
			</div>
		</div>
	);
}
