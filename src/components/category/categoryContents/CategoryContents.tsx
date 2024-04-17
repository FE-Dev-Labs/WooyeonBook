import styles from '@/styles/category/categoryContents/categoryContents.module.css';
import SortBar from './SortBar';
import CategoryBookItemBox from './CategoryBookItemBox';
import Pagination from '@/components/common/Pagination';
import CategorySlider from './categorySlider/CategorySlider';
import { NewBookType } from '@/types/bookType';

interface CategoryConentsProp {
	data: NewBookType[];
	dataLength: number;
	currentPage: number;
	page: string;
}

export default function CategoryContents({
	data,
	dataLength,
	currentPage,
	page,
}: CategoryConentsProp) {
	// 페이지 첫 시작 데이터의 숫자, 24 = 카테고리 페이지에 나타낼 아이템 갯수
	const startIndex = (currentPage - 1) * 24;
	// 앞서 보여진 데이터를 제외한 마지막 데이터의 숫자
	const endIndex = startIndex + 24;
	// 해당 페이지에서 보여줄 데이터
	const pageData = data.slice(startIndex, endIndex);

	return (
		<div className={styles.categoryContents}>
			{/* <CategorySlider /> */}
			<SortBar />
			<CategoryBookItemBox data={pageData} />
			{/* <Pagination
				dataLength={dataLength}
				handlePageNumClick={handlePageNumClick}
				currentPage={currentPage}
				page={page}
			/> */}
		</div>
	);
}
