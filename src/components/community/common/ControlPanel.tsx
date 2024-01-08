'use client';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';
import styles from '@/styles/community/controlPanel.module.css';
import Link from 'next/link';
function ControlPanel() {
	const Select = dynamic(() => import('react-select'), { ssr: false });

	const pathName = usePathname();
	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Oldest', label: '오래된 순' },
		{ value: 'View', label: '조회순' },
	];
	const categoriesByPage = () => {
		const page = pathName.split('/')[2];
		if (page === 'meeting') {
			return [
				{ value: 'All', label: '모집중' },
				{ value: 'All', label: '모집완료' },
			];
		}
		if (page === 'buyingBook') {
			return [
				{ value: 'All', label: '삽니다' },
				{ value: 'All', label: '거래완료' },
			];
		}
		if (page === 'sellingBook') {
			return [
				{ value: 'All', label: '나눔' },
				{ value: 'All', label: '팝니다' },
				{ value: 'All', label: '판매완료' },
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
				{pathName && pathName.split('/')[2] === 'bookReport' ? null : (
					<Select
						className={styles.optionBtn}
						options={categoriesByPage()}
						defaultValue={'전체'}
						isSearchable={false}
					/>
				)}
			</div>
			<Link href={``}>글쓰기</Link>
		</div>
	);
}

export default ControlPanel;
