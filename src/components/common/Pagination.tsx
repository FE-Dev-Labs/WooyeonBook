import styles from '@/styles/common/pagination.module.css';
import Image from 'next/image';
import arrowRightIcon from '../../../public/common/arrowRight.png';
import arrowDoubleRightIcon from '../../../public/common/arrowDoubleRight.png';

interface PaginationProps {
	itemLength: number;
	handleClickPage: (page: number) => void;
	page?: string;
}

export default function Pagination({
	itemLength,
	handleClickPage,
	page,
}: PaginationProps) {
	// 한 페이지 당 나타낼 아이템의 개수
	// page가 'best'라면 한 페이지 당 아이템의 개수를 24로, 아니면 30으로 설정
	const itemPerPage = page === 'best' ? 24 : 30;
	// 해당 카테고리의 페이지의 개수
	// const totalPages = Math.ceil(itemLength / itemPerPage);
	let totalPages =
		page === 'best'
			? Math.min(Math.ceil(itemLength / itemPerPage), 10)
			: Math.ceil(itemLength / itemPerPage);

	// 해당 카테고리의 페이지를 배열화
	let pageArr = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.paginationBox}>
				{pageArr.map((num) => {
					return (
						<div
							className={styles.paginationItem}
							key={num}
							onClick={() => {
								handleClickPage(num);
							}}>
							{num}
						</div>
					);
				})}
				{!page && (
					<>
						<div className={styles.paginationItem}>
							<Image src={arrowRightIcon} alt="arrow" width={18} height={18} />
						</div>
						<div className={styles.paginationItem}>
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
