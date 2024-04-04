import { useIsLoggedIn } from '@/hooks/useIsLoggedIn';
import { cartAtom } from '@/recoil/atom/cartAtom';
import { itemAmountAtom } from '@/recoil/atom/itemAmountAtom';
import styles from '@/styles/detail/detaildescription/detailorderbtn.module.css';
import { Book } from '@/types/bookDetailDate';
import { CartItemType } from '@/types/bookType';
import { useRouter } from 'next/navigation';
import { useRecoilState, useRecoilValue } from 'recoil';

interface DetailOrderBtnProp {
	bookInfo: Book;
}

export default function Detailorderbtn({ bookInfo }: DetailOrderBtnProp) {
	// useRouter 호출
	const router = useRouter();
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);
	// 현재 카트 아이템의 수량
	const itemQuantity = useRecoilValue(itemAmountAtom);
	// useIsLoggedIn 호출한 로그인 상태
	const { isLoggedIn } = useIsLoggedIn();

	// 카트페이지에서 필요한 요소들
	const newCartItem = {
		title: bookInfo.title,
		author: bookInfo.author,
		publisher: bookInfo.publisher,
		priceSales: bookInfo.priceSales,
		priceStandard: bookInfo.priceStandard,
		isbn: bookInfo.isbn,
		cover: bookInfo.cover,
		mallType: bookInfo.mallType,
		quantity: itemQuantity,
	};
	// 장바구니에 같은 ISBN을 가진 책이 있는지 확인하는 함수
	const isAlreadyInCart = cart.some((item) => item.isbn === newCartItem.isbn);

	// 장바구니 담기 선택 시 동작하는 함수
	const handleAddToCartClick = () => {
		if (confirm('선택 상품을 장바구니에서 담으시겠습니까?')) {
			// 이미 장바구니에 해당 아이템이 존재하는 경우
			if (isAlreadyInCart) {
				alert('이미 장바구니에 담긴 제품입니다.');
				// 장바구니에 해당 아이템이 존재하지 않는 경우
			} else {
				setCart([...cart, newCartItem]);
				alert('장바구니에 담겼습니다.');
			}
		}
	};

	// 주문하기 선택 시 동작하는 함수
	const handleOrderClick = async () => {
		if (!isLoggedIn) {
			if (confirm('로그인이 필요한 서비스입니다 로그인 하시겠습니까?')) {
				// 로그인 페이지로 이동
				router.push('/login');
				// 취소 시 함수 진행하지 않고 return
				return;
			}
		}
		// 이미 카트에 해당 아이템이 존재하는 경우
		if (isAlreadyInCart) {
			alert('이미 장바구니에 담긴 제품입니다. 장바구니 페이지로 이동합니다.');
			router.push('/cart');
			// 장바구니에 해당 아이템이 존재하지 않는 경우
		} else {
			alert('장바구니 페이지로 이동합니다.');
			// set
			setCart([...cart, newCartItem]);
			// 카트 페이지로 이동
			router.push('/cart');
		}
	};

	return (
		<div className={styles.btnWrapper}>
			<button className={styles.addToCartBtn} onClick={handleAddToCartClick}>
				장바구니 담기
			</button>
			<button className={styles.orderBtn} onClick={handleOrderClick}>
				주문하기
			</button>
		</div>
	);
}
