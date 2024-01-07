'use client';
import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

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
		if (page === 'bookReport') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'All', label: '모집중' },
				{ value: 'All', label: '모집완료' },
			];
		}
		if (page === 'bookReport') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'All', label: '삽니다' },
				{ value: 'All', label: '거래완료' },
			];
		}
		if (page === 'bookReport') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'All', label: '나눔' },
				{ value: 'All', label: '팝니다' },
				{ value: 'All', label: '판매완료' },
			];
		}
	};
	const categoryOptions = [
		{ value: 'All', label: '전체' },
		{ value: 'Free', label: '자유' },
		{ value: 'QnA', label: '질문' },
	];

	return (
		<div>
			<div>
				<Select options={sortOptions} isSearchable={false} />
				{pathName.split('/')[2] === 'bookReport' ? null : (
					<Select options={categoryOptions} isSearchable={false} />
				)}
			</div>
			<button>글쓰기</button>
		</div>
	);
}

export default ControlPanel;
