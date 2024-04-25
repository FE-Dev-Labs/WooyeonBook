'use client';
import { detailAddressAtom, roadAddressAtom } from '@/recoil/atom/signupAtom';
import styles from '@/styles/auth/auth.module.css';
import { useState } from 'react';
import DaumPostcode from 'react-daum-postcode';
import { useRecoilState } from 'recoil';
import closeWhiteIcon from '@/assets/common/closeWhiteIcon.png';
import Image from 'next/image';
import useAuth from '@/hooks/useAuth';

export default function SignupAddress() {
	const auth = useAuth();

	const [roadAddress, setRoadAddress] = useRecoilState(roadAddressAtom);
	const [detailaddress, setDetailAddress] = useRecoilState(detailAddressAtom);
	const [isOpen, setIsOpen] = useState<boolean>(false);

	// 주소 정보 가져오기
	const handleComplete = (data: any) => {
		auth.setZipcode(data.zonecode);
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
			<label className={styles.inputAddressLabel}>
				주소
				<div className={styles.addressZipcodeWrapper}>
					<input
						readOnly
						defaultValue={auth.zipcode}
						type="text"
						name="zipcode"
						className={styles.inputFieldAddress}
						placeholder="우편주소"
						onChange={auth.changeZipcode}
						ref={auth.zipcodeRef}
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
					className={styles.inputRoadAddress}
					placeholder="주소를 입력해주세요"
				/>
				<input
					defaultValue={detailaddress}
					type="text"
					name="detailaddress"
					className={styles.inputDetailRoadAddress}
					placeholder="상세주소를 입력해주세요"
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
											src={closeWhiteIcon}
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
