'use client';

import { cartAtom } from '@/recoil/atom/cartAtom';
import styles from '@/styles/cart/cartView/cartView.module.css';
import { CartItemType } from '@/types/bookType';
import { useState } from 'react';
import { useRecoilValue } from 'recoil';
import CartHeader from './cartHaeder/CartHeader';
import CartBody from './cartBody/CartBody';
import CartFooter from './cartFooter/CartFooter';
import OrderHistory from './orderHistory/OrderHistory';
import OrderButton from './orderButton/OrderButton';

export default function CartView() {
	// 카트 아이템 state
	const cart = useRecoilValue<CartItemType[]>(cartAtom);
	// 선택한 아이템 state
	const [checkedItem, setCheckedItem] = useState<string[]>(() =>
		cart.map((item) => item.isbn),
	);
	// 전체 선택 체크박스 state
	const [selectAll, setSelectAll] = useState<boolean>(true);

	return (
		<main>
			{cart.length > 0 ? (
				<div className={styles.container}>
					<div className={styles.wrapper}>
						<CartHeader
							checkedItem={checkedItem}
							setCheckedItem={setCheckedItem}
							selectAll={selectAll}
							setSelectAll={setSelectAll}
						/>
						<CartBody
							checkedItem={checkedItem}
							setCheckedItem={setCheckedItem}
						/>
						<CartFooter checkedItem={checkedItem} setSelectAll={setSelectAll} />
						<OrderHistory checkedItem={checkedItem} />
						<OrderButton checkedItem={checkedItem} />
					</div>
				</div>
			) : (
				// 장바구니가 비었을 떄
				<div className={styles.emptyCartWrapper}>
					<p>장바구니가 비어있습니다. 😅</p>
				</div>
			)}
		</main>
	);
}
