'use client';

import { mypage_QS } from '@/recoil/atom/mypageAtom';
import { AllDataType } from '@/types/community/view/data';
import { useRecoilState } from 'recoil';

const MypagePagination = ({ alldata }: { alldata: any[] }) => {
	const [qs, setQs] = useRecoilState(mypage_QS);

	// 총 페이지 수
	const allPageCount = Math.ceil(alldata.length / 4);

	// 총 그룹 수
	const allGroupCount = Math.ceil(allPageCount / 10);

	// 현재 페이지
	const nowPage = parseInt(qs.num) || 1;

	// 현재 페이지 그룹
	const nowGroup = Math.ceil(nowPage / 10);

	// 보여질 페이지 그룹의 시작과 끝
	const end = allPageCount % 10 === 0 ? nowGroup * 10 : allPageCount % 10;

	const start = nowGroup * 10 - 9;

	// 전채 페이지
	const allLinks = Array.from(
		{ length: Math.ceil(alldata.length / 3) },
		(v, i) => i + 1,
	);
	// 보여지는 페이지
	const links = Array.from({ length: end - start + 1 }, (v, i) => start + i);

	const isNext = allGroupCount > nowGroup && allLinks.length > 10;
	//   const isendNext =
	const isPrev = nowGroup > 0 && allLinks.length > 10;
	//   const isfirstprev =

	const onSubmit = (num: number) => {
		setQs({ ...qs, num: num.toString() });
	};

	const prev = () => {
		const num = parseInt(qs.num);
		if (num > 1) {
			setQs({ ...qs, num: (num - 1).toString() });
		}
	};

	const next = () => {
		const num = parseInt(qs.num);
		if (num < links.length) {
			setQs({ ...qs, num: (num + 1).toString() });
		}
	};

	if (allLinks.length === 0) {
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

export default MypagePagination;
