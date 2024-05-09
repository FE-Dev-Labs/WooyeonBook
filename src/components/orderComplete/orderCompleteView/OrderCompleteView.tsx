'use client';

import styles from '@/styles/orderComplete/orderCompleteView/orderCompleteView.module.css';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { CartItem } from '@/types/orderList';
import OrderProgress from './orderProgress/OrderProgress';
import OrderDetails from './orderDetails/OrderDetails';
import { usePathname } from 'next/navigation';

export default function OrderCompleteView() {
	// supabase 선언
	const supabase = createClient();
	// usePathname 선언
	const orderId = usePathname().split('/orderId=')[1];
	// 로그인 판별 및 유저 id
	const user = useRecoilValue(userAtom);
	// order state
	const [order, setOrder] = useState<CartItem[]>([]);
	// 로딩 state
	const [isLoading, setIsLoading] = useState<boolean>(true);

	// 주문 목록 불러오기
	const getOrderList = async () => {
		try {
			const { data, error } = await supabase
				.from('orderList')
				.select('cart')
				.eq('user_id', user.id)
				.order('created_at', { ascending: false })
				.limit(1);
			if (error) {
				console.log(error);
				throw error;
			}
			setOrder(data[0].cart);
		} catch (error) {
			console.error('Error fetching orders:', error);
		}
	};

	// 로딩 및 order list 뿌려주는 useEffect
	useEffect(() => {
		getOrderList();

		setTimeout(() => {
			setIsLoading(false);
		}, 4000);
	}, []);

	return (
		<div className={styles.container}>
			<main className={styles.wrapper}>
				{isLoading && <OrderProgress />}
				{!isLoading && (
					<OrderDetails userName={user.name} order={order} orderId={orderId} />
				)}
			</main>
		</div>
	);
}
