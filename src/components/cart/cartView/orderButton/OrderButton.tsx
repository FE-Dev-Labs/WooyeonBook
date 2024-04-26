import { cartAtom } from '@/recoil/atom/cartAtom';
import { userAtom } from '@/recoil/atom/userAtom';
import styles from '@/styles/cart/cartView/orderButton/orderButton.module.css';
import { CartItemType } from '@/types/bookType';
import { supabase } from '@/utils/supabase/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import uuid from 'react-uuid';
import { useRecoilState, useRecoilValue } from 'recoil';

interface OrderButtonProps {
	checkedItem: string[];
}

export default function OrderButton({ checkedItem }: OrderButtonProps) {
	// useRouter 호출
	const router = useRouter();
	// 카트 아이템 State
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);
	// 로딩 state
	// const [isLoading, setIsLoading] = useState<boolean>(false);
	// user state
	const user = useRecoilValue(userAtom);

	// 주문하기 버튼 클릭 시 동작하는 함수
	const handleOrderButtonClick = async () => {
		// 로그인 상태가 아닐 경우
		if (user.id === null) {
			if (confirm('로그인이 필요한 서비스입니다 로그인 하시겠습니까?')) {
				// 로그인 페이지로 이동
				router.push('/login');
			}
			// 취소 시 함수 종료
			return;
		}
		// 체크된 아이템이 없을 경우
		if (checkedItem.length === 0) {
			alert('주문할 상품을 선택해주세요.');
			return; // 함수를 여기서 종료
		}
		// 주문 확인
		if (confirm('상품을 주문하시겠습니까?')) {
			// // 주문 처리 시작 시 로딩 상태 true
			// setIsLoading(true);

			//
			// index id 값 및 item total price 추가
			//
			// cart 객체 내 각 아이템에 인덱스를 이용한 id 추가
			const myCart = cart.map((item, index) => ({
				...item,
				id: index,
			}));
			// cart 배열의 itemTotalPrice의 합 계산
			const totalOrderPrice = cart.reduce(
				(total, item) => total + item.itemTotalPrice,
				0,
			);
			// 테이블에 넣을 데이터(유저 아이디, 생성 일시, 주문 내역)
			const orderData = {
				user_id: user.id,
				cart_id: uuid(),
				created_at: new Date(),
				cart: myCart,
				totalOrderPrice,
			};

			// 테이블에 추가
			try {
				const { data, error } = await supabase
					.from('orderList')
					.insert([orderData]);
				if (error) {
					console.log('supabase error: ', error);
					alert('주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
				} else {
					// cart 초기화
					setCart([]);
					// 주문 완료 페이지로 이동
					router.push('/orderComplete');
					console.log('주문 완료', data);
				}
			} catch (error) {
				console.error('주문 중 오류 발생', error);
				alert('주문 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
			}
			// finally {
			// 	// 주문 완료 시 로딩 상태 false
			// 	setIsLoading(false);
			// }
		}
	};

	return (
		<div className={styles.orderButtonWrap}>
			<Link href={'/'}>
				<button>상품 추가</button>
			</Link>
			<button onClick={handleOrderButtonClick}>결제하기</button>
		</div>
	);
}
{
	/* {isLoading && (
				<div className={styles.loadingContainer}>주문이 진행중입니다. 😎</div>
			)}
			{!isLoading && (
				<div className={styles.orderButtonWrap}>
					<Link href={'/'}>
						<button>상품 추가</button>
					</Link>
					<button onClick={handleOrderButtonClick}>결제하기</button>
				</div>
			)} */
}
