'use client';
import Select from 'react-select';
function ControlPanel() {
	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Oldest', label: '오래된 순' },
		{ value: 'View', label: '조회순' },
	];
	const option = [
		{ value: '', label: '전체' },
		{ value: 'Latest', label: '최신순' },
	];
	return (
		<div>
			<div>
				<Select options={sortOptions} isSearchable={false} />
				<Select options={option} isSearchable={false} />
			</div>
		</div>
	);
}

export default ControlPanel;
