'use client';

import styles from '@/styles/detail/detaildescription/detailquantity.module.css';
import Image from 'next/image';
import minus from '../../../../public/detail/BsDashCircle.png';
import pluse from '../../../../public/detail/BsPlusCircle.png';
import { useRecoilState } from 'recoil';
import { itemAmountAtom } from '@/recoil/atom/itemAmountAtom';
import { useEffect } from 'react';

export default function Detailquantity() {
	// 장바구니 수량 state
	const [count, setCount] = useRecoilState<number>(itemAmountAtom);

	// 아이템 수량 감소 험수
	const decreaseCount = () => {
		setCount((prev) => Math.max(1, prev - 1));
	};

	// 아이템 수량 증가 함수
	const increaseCount = () => {
		setCount((prev) => prev + 1);
	};

	// input으로 수량을 조절하는 함수
	const handleInputChange = (e: any) => {
		const value = parseInt(e.target.value, 10);
		if (!isNaN(value)) {
			if (value > 100) {
				alert('수량은 최대 100개까지 주문 가능합니다.');
				setCount(100);
			} else if (value >= 1) {
				setCount(value);
			}
		}
	};

	useEffect(() => {
		// 컴포넌트가 마운트될 때 count를 1로 초기화
		setCount(1);
	}, [setCount]);

	return (
		<div className={styles.quantitySelectionWrap}>
			<div className={styles.quantityimgArea}>
				<Image
					className={styles.quantityMinusImg}
					alt="Minus"
					src={minus}
					width={20}
					height={20}
					onClick={decreaseCount}
				/>
				<input
					className={styles.quantityInput}
					value={count}
					onChange={handleInputChange}
				/>

				<Image
					className={styles.quantityPlusImg}
					alt="Pluse"
					src={pluse}
					width={20}
					height={20}
					onClick={increaseCount}
				/>
			</div>
		</div>
	);
}

// useEffect(() => {
// 	setCount(1); // 다른 페이지로 이동할 때 수량을 1로 초기화
// }, []);

// // 수량 추가
// const IncreaseQuantity = () => {
// 	setCount((prevCount) => {
// 		if (typeof prevCount === 'number') {
// 			return prevCount + 1;
// 		} else {
// 			return 0; // 초기값 설정
// 		}
// 	});
// };

// // 수량 감소
// const DecreaseQuantity = () => {
// 	if (count === 1) {
// 		alert('수량은 1개부터 주문 가능합니다');
// 		return;
// 	}

// 	setCount((prevCount: number | string) => {
// 		if (typeof prevCount === 'number') {
// 			return prevCount - 1;
// 		} else {
// 			return 0;
// 		}
// 	});
// };

// // Input 로직
// const InputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
// 	let newValue: number | string = parseInt(e.target.value);

// 	if (isNaN(newValue)) {
// 		newValue = '';
// 	} else if (newValue === 0) {
// 		return false;
// 	}
// 	setCount(newValue);
// };
