'use client';
import { CartAtom } from '@/recoil/atom/CartAtom';
import styles from '@/styles/detail/detaildescription/detailquantity.module.css';
import { Book } from '@/types/bookDetailDate';
import { useRecoilState } from 'recoil';
interface bookDetailProp {
	bookInfo: Book;
}
export default function Detailtotalquantity({ bookInfo }: bookDetailProp) {
	const [count, setCount] = useRecoilState<string | number>(CartAtom);
	const totalPrice =
		typeof count === 'number'
			? (count * bookInfo.priceSales).toLocaleString()
			: '';
	return (
		<div className={styles.quantityTotalSectionWrap}>
			<span className={styles.quantityTotal}>총 상품 금액</span>
			<span className={styles.quantityTotalPrice}>{totalPrice}</span>
			<span className={styles.quantityTotalWon}>원</span>
		</div>
	);
}
