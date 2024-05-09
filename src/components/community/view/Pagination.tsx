'use client';
import styles from '@/styles/common/pagination.module.css';
import { queryString } from '@/recoil/atom/queryString';
import { useRecoilState } from 'recoil';

const Pagination = ({
	length,
	show_page_num,
}: {
	length: number;
	show_page_num: number;
}) => {
	const [qs, setQs] = useRecoilState(queryString);

	// 총 페이지 수
	const allPageCount = Math.ceil(length / show_page_num);

	// 총 그룹 수
	const allGroupCount = Math.ceil(allPageCount / 10);

	// 현재 페이지
	const nowPage = parseInt(qs.num) || 1;

	// 현재 페이지 그룹
	const nowGroup = Math.ceil(nowPage / 10);

	// 보여질 페이지 그룹의 시작과 끝
	const end =
		nowGroup === allGroupCount && allPageCount % 10 === 0
			? nowGroup * 10
			: allPageCount % 10;
	const start = nowGroup * 10 - 9;

	// 전체 페이지
	const allLinks = Array.from({ length: allPageCount }, (v, i) => i + 1);
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
		<div className={styles.categoryContents}>
			<section className={styles.paginationContainer}>
				<div className={styles.paginationWrappper}>
					{isPrev && <button onClick={prev}>이전</button>}
					{links.map((item) => {
						return (
							<div
								className={
									nowPage === item ? styles.selectedNum : styles.paginationItem
								}
								key={item}
								onClick={() => onSubmit(item)}>
								{item}
							</div>
						);
					})}
					{isNext && <button onClick={next}>다음</button>}
				</div>
			</section>
		</div>
	);
};

export default Pagination;
