'use client';
import styles from '@/styles/detail/detaildescription/detailquantity.module.css';
import Image from 'next/image';
import minus from '../../../../public/detail/BsDashCircle.png';
import pluse from '../../../../public/detail/BsPlusCircle.png';
import { useRecoilState } from 'recoil';
import { CartAtom } from '@/recoil/atom/CartAtom';

export default function Detailquantity() {
	const [count, setCount] = useRecoilState(CartAtom);
	const IncreseQuantity = () => {};
	return (
		<div className={styles.quantitySelectionWrap}>
			<div className={styles.quantityimgArea}>
				<Image
					className={styles.quantityMinusImg}
					alt="Minus"
					src={minus}
					width={20}
					height={20}
					onClick={IncreseQuantity}
				/>
				<input className={styles.quantityInput} />

				<Image
					className={styles.quantityPlusImg}
					alt="Pluse"
					src={pluse}
					width={20}
					height={20}
				/>
			</div>
		</div>
	);
}
