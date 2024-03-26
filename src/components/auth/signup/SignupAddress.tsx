'use client';
import {
	detailAddressAtom,
	roadAddressAtom,
	zipcodeAtom,
} from '@/recoil/atom/signupAtom';
import styles from '@/styles/auth/auth.module.css';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useRecoilState } from 'recoil';
import closeIcon from '../../../../public/layout/closewhite.png';
import Image from 'next/image';

export default function SignupAddress() {
	const [zipcode, setZipcode] = useRecoilState(zipcodeAtom);
	const [roadAddress, setRoadAddress] = useRecoilState(roadAddressAtom);
	const [detailaddress, setDetailAddress] = useRecoilState(detailAddressAtom);
	const [isOpen, setIsOpen] = useState<boolean>(false);
	// const { handleComplete } = useAddress();
	const handleComplete = (data: any) => {
		setZipcode(data.zonecode);
		setRoadAddress(data.roadAddress);
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
					defaultValue={detailaddress}
					type="text"
					name="detailaddress"
					className={styles.inputField}
					placeholder="상세주소"
					onChange={changeHandler}
				/>
				{isOpen && (
					<>
						<div className={styles.daumPostBackground}>
							<div className={styles.postcodeWrapper}>
								<DaumPostcode
									className={styles.postCodeStyle}
									onComplete={handleComplete}
									style={{
										height: '500px',
										width: '500px',
									}}
								/>
								<div className={styles.closeIcon}>
									<div className={styles.closeBtnBackground}>
										<Image
											className={styles.closeBtn}
											src={closeIcon}
											alt="close"
											width={20}
											height={20}
											onClick={() => setIsOpen(false)}
										/>
									</div>
								</div>
							</div>
						</div>
					</>
				)}
			</label>
		</>
	);
}
