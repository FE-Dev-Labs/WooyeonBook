'use client';
// import useAddress from '@/hooks/useAddress';
import styles from '@/styles/auth/auth.module.css';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';

export default function SignupAddress() {
	const [zipcode, setZipcode] = useState<string>('');
	const [roadAddress, setRoadAddress] = useState<string>('');
	const [detailAddress, setDetailAddress] = useState<string>('');
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// const { handleComplete } = useAddress();
	const handleComplete = (data: any) => {
		setZipcode(data.zonecode);
		setRoadAddress(data.roadAddress);
		console.log(data.zonecode);
		console.log(data.roadAddress);
		setIsOpen(false);
	};
	// 검색 클릭
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};
	// 상세 주소 검색 event
	const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDetailAddress(e.target.value);
	};
	return (
		<>
			<label className={styles.inputLabel}>
				주소
				<div className={styles.inputAddress}>
					<input
						readOnly
						defaultValue={zipcode}
						type="text"
						name="zipcode"
						className={styles.inputFieldAddress}
						placeholder="우편주소"
					/>
					{isOpen && (
						<div>
							<DaumPostcode
								className={styles.postCodeStyle}
								onComplete={handleComplete}
							/>
						</div>
					)}
					<button
						type="button"
						className={styles.inputFieldBtn}
						onClick={handleToggle}>
						주소 검색
					</button>
				</div>
				<input
					readOnly
					defaultValue={roadAddress}
					type="text"
					name="address"
					className={styles.inputField}
					placeholder="주소"
				/>
				<input
					defaultValue={detailAddress}
					type="text"
					name="detailaddress"
					className={styles.inputField}
					placeholder="상세주소"
					onChange={changeHandler}
				/>
			</label>
		</>
	);
}
