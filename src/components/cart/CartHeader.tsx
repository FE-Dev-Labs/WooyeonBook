import { cartAtom } from '@/recoil/atom/cartAtom';
import styles from '@/styles/cart/cartHeader.module.css';
import { CartItemType } from '@/types/bookType';
import { useRecoilValue } from 'recoil';

interface CartHeaderProps {
	checkedItem: string[];
	setCheckedItem: (newCheckedItem: string[]) => void;
	selectAll: boolean;
	setSelectAll: (newSelectAll: boolean) => void;
}

export default function CartHeader({
	checkedItem,
	setCheckedItem,
	selectAll,
	setSelectAll,
}: CartHeaderProps) {
	// 카트 아이템 state
	const cart = useRecoilValue<CartItemType[]>(cartAtom);

	// 전체 아이템 체크박스를 선택하면 동작하는 함수
	const handleAllItemClick = () => {
		const isAllSelected = cart.every((item) => checkedItem.includes(item.isbn));

		if (isAllSelected) {
			setCheckedItem([]);
			// 모두 선택 해제
			setSelectAll(false);
		} else {
			const allItemIsbns = cart.map((item) => item.isbn);
			setCheckedItem(allItemIsbns);
			// 모두 선택
			setSelectAll(true);
		}
	};
	return (
		<div className={styles.cartHeader}>
			<input
				type="checkbox"
				onChange={handleAllItemClick}
				checked={selectAll}
			/>
			<p>상품 정보</p>
			<p>정가</p>
			<p>판매가</p>
			<p>수량</p>
			<p>합계</p>
		</div>
	);
}
