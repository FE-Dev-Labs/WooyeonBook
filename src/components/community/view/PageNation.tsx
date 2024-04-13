'use client';

import { queryString } from '@/recoil/atom/queryString';
import { AllDataType } from '@/types/community/view/data';
import { useRecoilState } from 'recoil';

const PageNation = ({ alldata }: { alldata: AllDataType[] }) => {
	const [qs, setQs] = useRecoilState(queryString);

	const links = Array.from(
		{ length: Math.ceil(alldata.length / 10) },
		(v, i) => i + 1,
	);

	const onSubmit = (num: number) => {
		setQs({ ...qs, num: num.toString() });
	};

	const prev = () => {
		const num = parseInt(qs.num);
		if (num > 1) {
			setQs({ ...qs, num: (num - 1).toString() });
		}
	};
	const isPrev = links.length > 10;

	const next = () => {
		const num = parseInt(qs.num);
		if (num < links.length) {
			setQs({ ...qs, num: (num + 1).toString() });
		}
	};
	const isNext = links.length > 10;

	if (links.length === 0) {
		return null;
	}
	return (
		<footer>
			{isPrev && <button onClick={prev}>이전</button>}
			{links.map((item) => {
				return (
					<button key={item} onClick={() => onSubmit(item)}>
						{item}
					</button>
				);
			})}
			{isNext && <button onClick={next}>다음</button>}
		</footer>
	);
};

export default PageNation;
