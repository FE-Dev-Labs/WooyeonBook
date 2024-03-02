import styles from '@/styles/common/pagination.module.css';
import Image from 'next/image';
import arrowRightIcon from '../../../public/common/arrowRight.png';
import arrowDoubleRightIcon from '../../../public/common/arrowDoubleRight.png';

interface PaginationProps {
	itemLength: number;
	handleClickPage: (page: number) => void;
}

export default function Pagination({
	itemLength,
	handleClickPage,
}: PaginationProps) {
	// 한 페이지 당 나타낼 아이템의 개수
	const page = 30;
	// 해당 카테고리의 페이지의 개수
	const totalPages = Math.ceil(itemLength / page);
	// 해당 카테고리의 페이지를 배열화
	let pageArr = Array.from({ length: totalPages }, (_, i) => i + 1);

	return (
		<div className={styles.paginationWrapper}>
			<div className={styles.paginationBox}>
				{pageArr.map((num, index) => {
					return (
						<div
							className={styles.paginationItem}
							key={index}
							onClick={() => {
								handleClickPage(num);
							}}>
							{num}
						</div>
					);
				})}
				<div className={styles.paginationItem}>
					<Image src={arrowRightIcon} alt="arrow" />
				</div>
				<div className={styles.paginationItem}>
					<Image src={arrowDoubleRightIcon} alt="arrow" />
				</div>
			</div>
		</div>
	);
}
