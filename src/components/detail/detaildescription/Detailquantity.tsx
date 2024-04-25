'use client';

import styles from '@/styles/detail/detailDescription/detailQuantity.module.css';
import Image from 'next/image';
import minusCircleIcon from '@/assets/common/minusCircleIcon.png';
import plusCircleIcon from '@/assets/common/plusCircleIcon.png';
import { useRecoilState } from 'recoil';
import { itemAmountAtom } from '@/recoil/atom/itemAmountAtom';
import { useEffect } from 'react';
import { Book } from '@/types/bookDetailDate';

interface DetailQuantityProp {
	bookInfo: Book;
}

export default function DetailQuantity({ bookInfo }: DetailQuantityProp) {
	// 장바구니 수량 state
	const [count, setCount] = useRecoilState<number>(itemAmountAtom);

	// 아이템 수량 감소 험수
	const handleDecreaseCountClick = () => {
		setCount((prev) => Math.max(1, prev - 1));
	};

	// 아이템 수량 증가 함수
	const handleIncreaseCountClick = () => {
		// 중고책인 경우 1개 이상 수량 증가 못하게 alert 후 함수 종료
		if (bookInfo.mallType === 'USED') {
			alert('중고 도서는 수량 조절이 불가능합니다.');
			return;
		} else if (count >= 100) {
			//이미 100개일 때 추가 증가 시도 시 경고
			alert('100권 이상 주문할 수 없습니다.');
			return;
		} else {
			setCount((prev) => prev + 1);
		}
	};

	// input으로 수량을 조절하는 함수
	const handleInputChange = (e: any) => {
		// 중고책인 경우 함수 종료
		if (bookInfo.mallType === 'USED') return;

		const value = parseInt(e.target.value);
		if (!isNaN(value)) {
			if (value > 100) {
				alert('100권 이상 주문할 수 없습니다.');
				setCount(100);
			} else if (value >= 1) {
				setCount(value);
			}
		}
	};

	// count를 1로 초기화시켜주는 useEffect
	useEffect(() => {
		setCount(1);
	}, [setCount]);

	return (
		<div className={styles.quantitySelectionWrap}>
			<div className={styles.quantityimgArea}>
				<Image
					className={styles.quantityMinusImg}
					alt="minus"
					src={minusCircleIcon}
					width={15}
					height={15}
					onClick={handleDecreaseCountClick}
				/>
				<input
					className={styles.quantityInput}
					value={count}
					onChange={handleInputChange}
				/>

				<Image
					className={styles.quantityPlusImg}
					alt="plus"
					src={plusCircleIcon}
					width={15}
					height={15}
					onClick={handleIncreaseCountClick}
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
