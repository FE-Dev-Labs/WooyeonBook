import { cartAtom } from '@/recoil/atom/cartAtom';
import styles from '@/styles/cart/cartFooter.module.css';
import { CartItemType } from '@/types/bookType';
import { useRecoilState } from 'recoil';

interface CartFooterProps {
	checkedItem: string[];
	setSelectAll: (newSelectAll: boolean) => void;
}

export default function CartFooter({
	checkedItem,
	setSelectAll,
}: CartFooterProps) {
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);

	// 선택한 아이템을 삭제하는 함수
	const handleDeleteCheckedItemClick = () => {
		if (confirm('선택 상품을 장바구니에서 삭제하시겠습니까?')) {
			// 체크된 아이템이 없을 경우
			if (checkedItem.length === 0) {
				alert('삭제할 상품을 선택해주세요.');
				return; // 함수를 여기서 종료
			}

			// 선택된 아이템을 삭제하는 로직을 실행
			setCart(cart.filter((item) => !checkedItem.includes(item.isbn)));
		}
		// 전체 선택 체크박스 해제
		setSelectAll(false);
	};

	return (
		<div className={styles.cartFooter}>
			<div className={styles.cartDeleteBtn}>
				<button onClick={handleDeleteCheckedItemClick}>삭제</button>
			</div>
		</div>
	);
}
