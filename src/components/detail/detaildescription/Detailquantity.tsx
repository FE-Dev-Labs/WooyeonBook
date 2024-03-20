'use client';
import styles from '@/styles/detail/detaildescription/detailquantity.module.css';
import Image from 'next/image';
import minus from '../../../../public/detail/BsDashCircle.png';
import pluse from '../../../../public/detail/BsPlusCircle.png';
import { useRecoilState } from 'recoil';
import { cartAtom } from '@/recoil/atom/cartAtom';
import { useEffect } from 'react';

export default function Detailquantity() {
	const [count, setCount] = useRecoilState<string | number>(cartAtom);

	// 수량 추가
	const IncreaseQuantity = () => {
		setCount((prevCount) => {
			if (typeof prevCount === 'number') {
				return prevCount + 1;
			} else {
				return 0; // 초기값 설정
			}
		});
	};

	// 수량 감소
	const DecreaseQuantity = () => {
		if (count === 1) {
			alert('수량은 1개부터 주문 가능합니다');
			return;
		}

		setCount((prevCount: number | string) => {
			if (typeof prevCount === 'number') {
				return prevCount - 1;
			} else {
				return 0;
			}
		});
	};

	// Input 로직
	const InputQuantity = (e: React.ChangeEvent<HTMLInputElement>) => {
		let newValue: number | string = parseInt(e.target.value);

		if (isNaN(newValue)) {
			newValue = '';
		} else if (newValue === 0) {
			return false;
		}
		setCount(newValue);
	};

	useEffect(() => {
		setCount(1); // 다른 페이지로 이동할 때 수량을 1로 초기화
	}, []);

	return (
		<div className={styles.quantitySelectionWrap}>
			<div className={styles.quantityimgArea}>
				<Image
					className={styles.quantityMinusImg}
					alt="Minus"
					src={minus}
					width={20}
					height={20}
					onClick={DecreaseQuantity}
				/>
				<input
					className={styles.quantityInput}
					value={count}
					onChange={InputQuantity}
				/>

				<Image
					className={styles.quantityPlusImg}
					alt="Pluse"
					src={pluse}
					width={20}
					height={20}
					onClick={IncreaseQuantity}
				/>
			</div>
		</div>
	);
}
