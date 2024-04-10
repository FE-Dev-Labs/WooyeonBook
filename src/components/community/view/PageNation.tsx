'use client';

import { AllDataType } from '@/types/community/view/data';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const PageNation = ({ sortedData }: { sortedData: AllDataType[] }) => {
	const [url, setUrl] = useState('');
	useEffect(() => {
		setUrl(window.location.href);
	}, []);

	const links = Array.from(
		{ length: Math.ceil(sortedData.length / 10) },
		(v, i) => i + 1,
	);

	const prev = () => {};
	const next = () => {};

	return (
		<>
			{links.map((item) => {
				return (
					<Link key={item} href={`${url}?page=${item}`}>
						{item}
					</Link>
				);
			})}
		</>
	);
};

export default PageNation;
