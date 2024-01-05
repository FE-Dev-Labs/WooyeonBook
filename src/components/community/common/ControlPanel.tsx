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
	// console.log(pathName.split('/')[2]);

	return (
		<div>
			<div>
				<Select options={sortOptions} isSearchable={false} />
				<Select options={sortOptions} isSearchable={false} />
			</div>
			<button>글쓰기</button>
		</div>
	);
}

export default ControlPanel;
