'use client';

import styles from '@/styles/category/categoryView/categoryContents/categoryContents.module.css';
import { NewBookType } from '@/types/bookType';
import { useRecoilValue } from 'recoil';
import { CurrentPageAtom } from '@/recoil/atom/CurrentPageAtom';
import SortBar from '@/components/common/SortBar';
import CategoryBookItemWrapper from './categoryBookItemWrapper/CategoryBookItemWrapper';
import Pagination from '@/components/common/Pagination';

interface CategoryContentsProps {
	categoryId: string;
	data: NewBookType[];
}

export default function CategoryContents({
	categoryId,
	data,
}: CategoryContentsProps) {
	// current page value
	const currentPage = useRecoilValue(CurrentPageAtom);
	// 페이지 첫 시작 데이터의 숫자, 24 = 카테고리 페이지에 나타낼 아이템 갯수
	const startIndex = (currentPage - 1) * 24;
	// 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	const endIndex = startIndex + 24;
	// 해당 페이지에서 보여줄 데이터
	const pageData = data?.slice(startIndex, endIndex);

	return (
		<div className={styles.categoryContents}>
			{/* <CategorySlider /> */}
			<SortBar categoryId={categoryId} page="category" />
			<CategoryBookItemWrapper data={pageData} />
			<Pagination dataLength={data.length} />
		</div>
	);
}
