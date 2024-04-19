'use client';

import styles from '@/styles/category/categoryContents/categoryContents.module.css';
import SortBar from './SortBar';
import CategoryBookItemBox from './CategoryBookItemBox';
import Pagination from '@/components/common/Pagination';
import CategorySlider from './categorySlider/CategorySlider';
import { NewBookType } from '@/types/bookType';
import { useRecoilValue } from 'recoil';
import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';

interface CategoryConentsProp {
	data: NewBookType[];
	dataLength: number;
	currentPage: number;
	categoryId: string;
	page: string;
}

export default function CategoryContents({
	data,
	dataLength,
	// currentPage,
	categoryId,
	page,
}: CategoryConentsProp) {
	const currentPage = useRecoilValue(CurrentPageAtom);

	// 페이지 첫 시작 데이터의 숫자, 24 = 카테고리 페이지에 나타낼 아이템 갯수
	const startIndex = (currentPage - 1) * 24;
	// 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	const endIndex = startIndex + 24;
	// 해당 페이지에서 보여줄 데이터
	const pageData = data.slice(startIndex, endIndex);
	// console.log(data[0]);

	// console.log(pageData);

	return (
		<div className={styles.categoryContents}>
			{/* <CategorySlider /> */}
			<SortBar categoryId={categoryId} />
			<CategoryBookItemBox data={pageData} />
			<Pagination
				dataLength={dataLength}
				// handlePageNumClick={handlePageNumClick}
				// currentPage={currentPage}
				page={page}
			/>
		</div>
	);
}
