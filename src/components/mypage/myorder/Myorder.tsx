import styles from '@/styles/mypage/order/order.module.css';
import MyOderList from './MyOderList';
import { createClient } from '@/utils/supabase/client';
import { getUser } from '@/apis/community/getUser';
import useCurrentUser from '@/hooks/useCurrentUser';
import { useEffect, useState } from 'react';
import { BookOrderList } from '@/types/orderList';

export default function MyOrder() {
	const [orderList, setOrderList] = useState<BookOrderList[]>([]);
	const supabase = createClient();
	const { userId } = useCurrentUser();
	// 주문 목록 불러오기
	const getOrderList = async () => {
		const { data, error } = await supabase
			.from('orderList')
			.select('cart')
			.eq('user_id', userId)
			// 최신 순으로 가져옴
			.order('created_at', { ascending: false });
		if (error) {
			console.log(error);
		} else if (data && data.length > 0) {
			// setOrderList(data[0].cart);
			setOrderList(data.map((item) => item.cart));
		}
	};
	useEffect(() => {
		getOrderList();
	}, []);

	console.log('사이즈', orderList);
	return (
		<>
			<div className={styles.orderDateContainer}>
				<h1>2024년 1월 1일</h1>
			</div>
			<div className={styles.orderAccordionContainer}>
				<div className={styles.orderAccordionWrapper}>
					<ul className={styles.orderNav}>
						{/* <li>숫자</li> */}
						<li>상품 정보</li>
						<li>정가</li>
						<li>판매가</li>
						<li>수량</li>
						<li>합계</li>
					</ul>
					<MyOderList />
				</div>
			</div>
		</>
	);
}
