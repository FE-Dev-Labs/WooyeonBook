'use client';

import styles from '@/styles/cart/cart.module.css';
import { cartAtom } from '@/recoil/atom/cartAtom';
import { CartItemType } from '@/types/bookType';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import PageHeader from '@/components/common/PageHeader';
import CartHeader from '@/components/cart/CartHeader';
import CartBody from '@/components/cart/CartBody';
import CartFooter from '@/components/cart/CartFooter';
import OrderHistory from '@/components/cart/OrderHistory';
import OrderButton from '@/components/cart/OrderButton';

export default function cartPage() {
	// 카트 아이템 state
	const cart = useRecoilValue<CartItemType[]>(cartAtom);
	// 선택한 아이템 state
	const [checkedItem, setCheckedItem] = useState<string[]>(() =>
		cart.map((item) => item.isbn),
	);
	// 전체 선택 체크박스 state
	const [selectAll, setSelectAll] = useState<boolean>(true);

	return (
		<div>
			<PageHeader title="장바구니" />
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
		</div>
	);
}
