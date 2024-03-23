import styles from '@/styles/common/pagination.module.css';
import Image from 'next/image';
import arrowRightIcon from '../../../public/common/arrowRight.png';
import arrowDoubleRightIcon from '../../../public/common/arrowDoubleRight.png';
import arrowLeftIcon from '../../../public/common/arrowLeft.png';
import arrowDoubleLeftIcon from '../../../public/common/arrowDoubleLeft.png';

interface PaginationProps {
	dataLength: number;
	pageLength: number;
	currentPage: number;
	handlePageNumClick: (page: number) => void;
	page?: string;
}

export default function Pagination({
	pageLength,
	dataLength,
	currentPage,
	handlePageNumClick,
	page,
}: PaginationProps) {
	// 한 페이지 당 나타낼 아이템의 개수
	// page가 'best'라면 한 페이지 당 아이템의 개수를 24로, 아니면 30으로 설정
	const itemPerPage = page === 'best' || 'category' ? 24 : 30;

	// 해당 카테고리의 페이지의 개수
	// const totalPages = Math.ceil(itemLength / itemPerPage);
	let totalPages =
		// 베스트셀러 페이지일 시 최대 10개 페이지
		page === 'best'
			? Math.min(Math.ceil(dataLength / itemPerPage), 10)
			: // 중고도서 페이지일 시 최대 30개 페이지(데이터가 많음)
				page === 'used'
				? Math.min(Math.ceil(dataLength / itemPerPage), 30)
				: Math.ceil(dataLength / itemPerPage);

	// 해당 카테고리의 페이지 갯수 배열화
	let pageArr = Array.from({ length: pageLength }, (_, i) => i + 1);

	// return (
	// 	<div className={styles.paginationWrapper}>
	// 		<div className={styles.paginationBox}>
	// 			{pageArr.map((num) => {
	// 				return (
	// 					<div
	// 						className={
	// 							currentPage === num ? styles.selectedNum : styles.paginationItem
	// 						}
	// 						key={num}
	// 						onClick={() => {
	// 							handlePageNumClick(num);
	// 						}}>
	// 						{num}
	// 					</div>
	// 				);
	// 			})}
	// 			{totalPages > 10 && (
	// 				<>
	// 					<div className={styles.paginationItem}>
	// 						<Image src={arrowRightIcon} alt="arrow" width={18} height={18} />
	// 					</div>
	// 					<div className={styles.paginationItem}>
	// 						<Image
	// 							src={arrowDoubleRightIcon}
	// 							alt="arrow"
	// 							width={18}
	// 							height={18}
	// 						/>
	// 					</div>
	// 				</>
	// 			)}
	// 		</div>
	// 	</div>
	// );

	// 현재 페이지 그룹 계산
	const currentPageGroup = Math.ceil(currentPage / 10);

	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.paginationBox}>
				{currentPageGroup > 1 && (
					<>
						<div
							className={styles.paginationItem}
							onClick={() =>
								handlePageNumClick((currentPageGroup - 2) * 10 + 1)
							}>
							<Image
								src={arrowDoubleLeftIcon}
								alt="arrow"
								width={18}
								height={18}
							/>
						</div>
						<div
							className={styles.paginationItem}
							onClick={() => handlePageNumClick((currentPageGroup - 1) * 10)}>
							<Image src={arrowLeftIcon} alt="arrow" width={18} height={18} />
						</div>
					</>
				)}
				{pageArr.map((num) => {
					return (
						<div
							className={
								currentPage === num ? styles.selectedNum : styles.paginationItem
							}
							key={num}
							onClick={() => {
								handlePageNumClick(num);
							}}>
							{num}
						</div>
					);
				})}
				{totalPages > currentPageGroup * 10 && (
					<>
						<div
							className={styles.paginationItem}
							onClick={() => handlePageNumClick(currentPageGroup * 10 + 1)}>
							<Image src={arrowRightIcon} alt="arrow" width={18} height={18} />
						</div>
						<div
							className={styles.paginationItem}
							onClick={() =>
								handlePageNumClick(
									Math.min((currentPageGroup + 1) * 10, totalPages),
								)
							}>
							<Image
								src={arrowDoubleRightIcon}
								alt="arrow"
								width={18}
								height={18}
							/>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
