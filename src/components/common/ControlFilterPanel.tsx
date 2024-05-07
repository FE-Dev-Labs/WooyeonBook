'use client';
import dynamic from 'next/dynamic';
import styles from '@/styles/common/controlfilterpanel.module.css';
import { useSearchParams } from 'next/navigation';
import { useRecoilState } from 'recoil';
import { mypage_QS } from '@/recoil/atom/mypageAtom';

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function ControlFilterPanel() {
	const params = useSearchParams();
	const page = params.get('page');
	const [qs, setQs] = useRecoilState(mypage_QS);

	const onChangeSort = (e: any) => {
		setQs({ ...qs, sort: e.value });
	};

	const onChangeCategories = (e: any) => {
		setQs({ ...qs, categories: e.value });
	};

	const onChangeHandler = (e: any) => {
		onChangeSort(e);
		onChangeCategories(e);
	};

	const sortOptions = [
		{ value: 'Latest', label: '최신순' },
		{ value: 'Like', label: '인기순' },
		{ value: 'View', label: '조회순' },
	];

	const categoriesOption = () => {
		if (page === 'bookMeeting') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '모집중' },
				{ value: 'false', label: '모집완료' },
			];
		}
		if (page === 'bookBuying') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '삽니다' },
				{ value: 'false', label: '거래완료' },
			];
		}
		if (page === 'bookSelling') {
			return [
				{ value: 'All', label: '전체' },
				{ value: 'true', label: '나눔' },
				{ value: 'false', label: '팝니다' },
			];
		}
	};

	if (page === 'likes') {
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
					onChange={onChangeSort}
				/>

				{page === 'bookReport' ? null : (
					<Select
						className={styles.optionBtn}
						options={categoriesOption()}
						defaultValue={{ value: 'All', label: '전체' }}
						isSearchable={false}
						onChange={onChangeHandler}
					/>
				)}
			</div>
		</div>
	);
}
