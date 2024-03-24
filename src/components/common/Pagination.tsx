import styles from '@/styles/common/pagination.module.css';
import Image from 'next/image';
import arrowRightIcon from '../../../public/common/arrowRight.png';
import arrowDoubleRightIcon from '../../../public/common/arrowDoubleRight.png';
import arrowLeftIcon from '../../../public/common/arrowLeft.png';
import arrowDoubleLeftIcon from '../../../public/common/arrowDoubleLeft.png';
import { useEffect, useState } from 'react';

// PaginationProps 인터페이스 정의
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
	// 페이지 그룹 state
	const [pageGroup, setPageGroup] = useState(
		Math.floor((currentPage - 1) / 10),
	);

	// 한 페이지 당 나타낼 아이템의 개수 설정. page가 'best' 또는 'category'일 경우 24, 그 외는 30으로 설정
	const itemPerPage = page === 'best' || page === 'category' ? 24 : 30;
	// 전체 페이지 수 계산
	let totalPages =
		// 베스트페이지일 시, 최대 페이지 10개
		page === 'best'
			? Math.min(Math.ceil(dataLength / itemPerPage), 10)
			: // 중고도서페이지일 시, 최대 페이지 30개
				page === 'used'
				? Math.min(Math.ceil(dataLength / itemPerPage), 30)
				: // 베스트, 중고가 아닐 때(카테고리, 신간), 최대 페이지 개수 제한X
					Math.ceil(dataLength / itemPerPage);

	// 한 번에 보여줄 페이지 수
	const groupSize = 10;
	// 현재 페이지 그룹에 따른 시작 페이지
	const startPage = pageGroup * groupSize + 1;
	// 현재 페이지 그룹에 따른 끝 페이지
	const endPage = Math.min(startPage + groupSize - 1, totalPages);
	// 현재 페이지 그룹에 속하는 페이비 번호들의 배열
	let pageArr = Array.from(
		{ length: endPage - startPage + 1 },
		(_, i) => startPage + i,
	);

	// 총 페이지 그룹 수 계산
	const totalPageGroups = Math.ceil(totalPages / groupSize);
	// 첫 번째 페이지 그룹인지 확인
	const isFirstPageGroup = pageGroup === 0;
	// 마지막 페이지 그룹인지 확인
	const isLastPageGroup = pageGroup === totalPageGroups - 1;

	// currentPage가 변경될 때마다 페이지 그룹을 업데이트하는 useEffect
	useEffect(() => {
		setPageGroup(Math.floor((currentPage - 1) / groupSize));
	}, [currentPage]);

	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.paginationBox}>
				{/* 맨 처음 페이지로 이동하는 버튼, 첫 번째 페이지 그룹(1~10)이 아닐 때만 렌더링 */}
				{!isFirstPageGroup && currentPage > 1 && (
					<Image
						src={arrowDoubleLeftIcon}
						alt="first page button"
						width={30}
						height={30}
						className={styles.paginationItem}
						onClick={() => handlePageNumClick(1)}
					/>
				)}
				{/* 이전 페이지 버튼, 첫 번째 페이지 그룹(1~10)이 아닐 때만 렌더링 */}
				{!isFirstPageGroup && currentPage > 1 && (
					<Image
						src={arrowLeftIcon}
						alt="prev button"
						width={30}
						height={30}
						className={styles.paginationItem}
						onClick={() => handlePageNumClick(currentPage - 1)}
					/>
				)}
				{/* 페이지 번호 버튼 */}
				{pageArr.map((num) => (
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
				))}
				{/* 다음 페이지 버튼, 마지막 페이지 그룹이 아닐 때만 렌더링 */}
				{!isLastPageGroup && currentPage < totalPages && (
					<Image
						src={arrowRightIcon}
						alt="next button"
						width={30}
						height={30}
						className={styles.paginationItem}
						onClick={() => handlePageNumClick(currentPage + 1)}
					/>
				)}
				{/* 맨 마지막 페이지로 이동하는 버튼, 마지막 페이지 그룹이 아닐 때만 렌더링 */}
				{!isLastPageGroup && currentPage < totalPages && (
					<Image
						src={arrowDoubleRightIcon}
						alt="last page button"
						width={30}
						height={30}
						className={styles.paginationItem}
						onClick={() => handlePageNumClick(totalPages)}
					/>
				)}
			</div>
		</div>
	);
}
