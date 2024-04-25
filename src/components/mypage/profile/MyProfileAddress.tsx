'use client';
import styles from '@/styles/mypage/profile/profile.module.css';
import { useInforDateType } from '@/types/userInforDate';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';
import MyProfileDaumApi from './MyProfileDaumApi';
// import MyProfileDaumApi from './MyprofileDaumApi';

interface userIdProps {
	userInfor: useInforDateType[];
	getUserInfor: any;
	setIsEditingName: any;
	setIsEditingPhone: any;
	isEditingPhone: any;
	isEditingName: any;
	userId: string;
}
export default function MyProfileAddress({
	userInfor,
	getUserInfor,
	setIsEditingName,
	setIsEditingPhone,
	isEditingPhone,
	isEditingName,
	userId,
}: userIdProps) {
	// 수정 버튼
	const [changeInfor, setChangeInfor] = useState<boolean>(false);
	// 주소 검색
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const [isEditingZipcode, setIsEditingZipcode] = useState(
		userInfor[0]?.zipcode,
	);
	const [isEditingAddress, setIsEditingAddress] = useState(
		userInfor[0]?.address,
	);
	const [isEditingDetailAddress, setIsEditingDetailAddress] = useState(
		userInfor[0]?.detailaddress,
	);
	const supabase = createClient();

	// 사용자 정보 변경으로 외부 데이터 변경을 감지해서 상태를 업데이트해야된다.
	useEffect(() => {
		if (userInfor.length > 0) {
			setIsEditingZipcode(userInfor[0].zipcode);
			setIsEditingAddress(userInfor[0].address);
			setIsEditingDetailAddress(userInfor[0].detailaddress);
			setIsEditingName();
			setIsEditingPhone();
		}
	}, [userInfor]);

	// 검색 클릭
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};

	// 회원정보 수정
	const changeUser = async () => {
		const userUpData = {
			name: isEditingName,
			zipcode: isEditingZipcode,
			address: isEditingAddress,
			detailaddress: isEditingDetailAddress,
			phone: isEditingPhone,
		};
		const { data, error } = await supabase
			.from('users')
			.update(userUpData)
			.eq('id', userId)
			.select();
		if (error) {
			console.log(error);
		} else {
			setChangeInfor(false);
			getUserInfor();
		}
	};
	return (
		<div>
			{userInfor.map((item: any) => (
				<div className={styles.accodionRowSelection} key={item.id}>
					{changeInfor ? (
						<>
							<div className={styles.profileBtnWrapper}>
								<li className={styles.accordionWrapperItem}>
									<span className={styles.profileItemTitle}>수령인</span>
									<input
										type="text"
										name="name"
										value={isEditingName}
										onChange={(e) => setIsEditingName(e.target.value)}
										className={styles.profileInput}
									/>
								</li>
								<button className={styles.profileEditBtn} onClick={changeUser}>
									주소록 저장
								</button>
							</div>
							<li className={styles.accordionWrapperItem}>
								<span className={styles.profileItemTitle}>주소</span>
								<div className={styles.inputAddress}>
									<input
										type="text"
										name="zipcode"
										value={isEditingZipcode}
										placeholder="우편주소"
										onChange={(e) => setIsEditingZipcode(e.target.value)}
										className={styles.profileInput}
									/>
									<button
										type="button"
										className={styles.inputFieldBtn}
										onClick={handleToggle}>
										주소 검색
									</button>
								</div>
								<input
									type="text"
									name="address"
									placeholder="주소"
									value={isEditingAddress}
									onChange={(e) => setIsEditingAddress(e.target.value)}
									className={styles.profileInput}
								/>

								<input
									type="text"
									name="detailaddress"
									placeholder="상세주소"
									value={isEditingDetailAddress}
									onChange={(e) => setIsEditingDetailAddress(e.target.value)}
									className={styles.profileInput}
								/>
							</li>
							<li className={styles.accordionWrapperItem}>
								<span className={styles.profileItemTitle}>연락처</span>
								<input
									type="text"
									name="phone"
									value={isEditingPhone}
									onChange={(e) => setIsEditingPhone(e.target.value)}
									className={styles.profileInput}
								/>
							</li>
						</>
					) : (
						<>
							<div className={styles.profileBtnWrapper}>
								<li className={styles.accordionWrapperItem}>
									<span className={styles.profileItemTitle}>수령인</span>
									<span className={styles.profileItem}>{item.name}</span>
								</li>
								<button
									className={styles.profileEditBtn}
									onClick={() => setChangeInfor(true)}>
									주소록 수정
								</button>
							</div>
							<li className={styles.accordionWrapperItem}>
								<span className={styles.profileItemTitle}>주소</span>
								<div className={styles.addressWrapper}>
									<span className={styles.profileItemZipcode}>
										{item.zipcode}
									</span>
									<span className={styles.profileItemAddress}>
										{item.address}
									</span>
									<span className={styles.profileItem}>
										{item.detailaddress}
									</span>
									<span className={styles.addressdelivery}>기본배송</span>
								</div>
							</li>
							<li className={styles.accordionWrapperItem}>
								<span className={styles.profileItemTitle}>연락처</span>
								<span className={styles.profileItem}>{item.phone}</span>
							</li>
						</>
					)}
				</div>
			))}
			{isOpen && (
				<MyProfileDaumApi
					setIsOpen={setIsOpen}
					setIsEditingZipcode={setIsEditingZipcode}
					setIsEditingAddress={setIsEditingAddress}
				/>
			)}
		</div>
	);
}
