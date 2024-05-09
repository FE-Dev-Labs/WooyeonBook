import { cartAtom } from '@/recoil/atom/cartAtom';
import styles from '@/styles/cart/cartView/cartBody/cartBody.module.css';
import { CartItemType } from '@/types/bookType';
import Image from 'next/image';
import Link from 'next/link';
import { useRecoilState } from 'recoil';
import minusCircleIcon from '@/assets/common/minusCircleIcon.png';
import plusCircleIcon from '@/assets/common/plusCircleIcon.png';

interface CartBodyProps {
	checkedItem: string[];
	setCheckedItem: (newCheckedItem: string[]) => void;
}

export default function CartBody({
	checkedItem,
	setCheckedItem,
}: CartBodyProps) {
	// 카트 아이템 state
	const [cart, setCart] = useRecoilState<CartItemType[]>(cartAtom);

	// 아이템 체크박스를 선택하면 동작하는 함수
	const handleCheckboxClick = (isbn: string) => {
		if (checkedItem.includes(isbn)) {
			setCheckedItem(checkedItem.filter((item) => item !== isbn));
		} else {
			setCheckedItem([...checkedItem, isbn]);
		}
	};

	// 아이템 수량 감소 험수
	const handleDecreaseCountClick = (isbn: string) => {
		// 아이템 수량 1 초과일 경우 quantity -1
		const updateCount = cart.map((item) => {
			if (item.isbn === isbn && item.quantity > 1) {
				return { ...item, quantity: item.quantity - 1 };
			}
			return item;
		});
		setCart(updateCount);
	};

	// 아이템 수량 증가 함수
	const handleIncreaseCountClick = (isbn: string) => {
		// 아이템 수량 quantity +1
		const updateCount = cart.map((item) => {
			if (item.isbn === isbn) {
				// 중고책인 경우 1개 이상 수량 증가 못하게 alert 후 함수 종료
				if (item.mallType === 'USED') {
					alert('중고 도서는 수량 조절이 불가능합니다.');
					return item;
				}
				// 수량이 100 이상인 경우 경고 메시지 출력
				if (item.quantity >= 100) {
					alert('100권 이상 주문할 수 없습니다.');
					return item;
				}
				return { ...item, quantity: item.quantity + 1 };
			}
			return item;
		});
		setCart(updateCount);
	};

	return (
		<div className={styles.cartBody}>
			{cart.map((item: CartItemType) => (
				<div key={item?.isbn} className={styles.cartItem}>
					<input
						className={styles.cartBodyCheckbox}
						type="checkbox"
						checked={checkedItem.includes(item?.isbn)}
						onChange={() => {
							handleCheckboxClick(item?.isbn);
						}}
					/>
					<div className={styles.itemInfoWrap}>
						<Link
							href={`/detail/${item?.isbn}?type=${
								item?.mallType === 'USED' ? 'used' : 'new'
							}`}>
							<Image
								src={item?.cover}
								alt="cart item"
								width={80}
								height={110}
							/>
						</Link>

						<div className={styles.itemInfoTextWrap}>
							<Link
								href={`/detail/${item?.isbn}?type=${
									item?.mallType === 'USED' ? 'used' : 'new'
								}`}>
								<p className={styles.itemTitle}>{item?.title}</p>
							</Link>

							<p className={styles.itemAuther}>{item?.author}</p>
							<p className={styles.itemPublisher}>{item?.publisher}</p>
						</div>
					</div>
					<div className={styles.itemPriceStandard}>
						{item?.priceStandard.toLocaleString()}원
					</div>
					<div className={styles.itemPriceSales}>
						{item?.priceSales.toLocaleString()}원
					</div>
					<div className={styles.quantityWrap}>
						<Image
							src={minusCircleIcon}
							alt="minus button"
							width={15}
							height={15}
							onClick={() => {
								handleDecreaseCountClick(item?.isbn);
							}}
						/>
						<div className={styles.quantity}>{item?.quantity}</div>
						<Image
							src={plusCircleIcon}
							alt="plus button"
							width={15}
							height={15}
							onClick={() => {
								handleIncreaseCountClick(item?.isbn);
							}}
						/>
					</div>
					<div className={styles.itemSumPrice}>
						{(item?.priceSales * item?.quantity).toLocaleString()}원
					</div>
				</div>
			))}
		</div>
	);
}
