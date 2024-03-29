import { cartAtom } from '@/recoil/atom/cartAtom';
import { itemAmountAtom } from '@/recoil/atom/itemAmountAtom';
import styles from '@/styles/detail/detaildescription/detailorderbtn.module.css';
import { Book } from '@/types/bookDetailDate';
import { CartItemType } from '@/types/bookType';
import { useRecoilState, useRecoilValue } from 'recoil';

interface DetailOrderBtnProp {
	bookInfo: Book;
}

export default function Detailorderbtn({ bookInfo }: DetailOrderBtnProp) {
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);
	// 현재 카트 아이템의 수량
	const itemQuantity = useRecoilValue(itemAmountAtom);

	// 장바구니 담기 선택 시 동작하는 함수
	const handleAddToCartClick = () => {
		const newCartItem = {
			// 카트페이지에서 필요한 요소들만 추출
			title: bookInfo.title,
			author: bookInfo.author,
			publisher: bookInfo.publisher,
			priceSales: bookInfo.priceSales,
			priceStandard: bookInfo.priceStandard,
			isbn: bookInfo.isbn,
			cover: bookInfo.cover,
			quantity: itemQuantity,
		};

		// 장바구니에 같은 ISBN을 가진 책이 있는지 확인
		const isAlreadyInCart = cart.some((item) => item.isbn === newCartItem.isbn);
		// 컨펌
		const isConfirmed = confirm('선택 상품을 장바구니에서 담으시겠습니까?');
		// 사용자가 '예'를 선택한 경우
		if (isConfirmed) {
			// 이미 장바구니에 아이템이 존재하는 경우
			if (isAlreadyInCart) {
				alert('이미 장바구니에 담긴 제품입니다.');
			} else {
				setCart([...cart, newCartItem]);
				alert('장바구니에 담겼습니다.');
			}
		}
	};

	return (
		<div className={styles.btnWrapper}>
			<button className={styles.addToCartBtn} onClick={handleAddToCartClick}>
				장바구니 담기
			</button>
			<button className={styles.orderBtn}>주문하기</button>
		</div>
	);
}
