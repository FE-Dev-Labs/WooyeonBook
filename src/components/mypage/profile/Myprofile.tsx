'use client';
import styles from '@/styles/mypage/profile/profile.module.css';
import { createClient } from '@/utils/supabase/client';
import { useEffect, useState } from 'react';
import { useInforDateType } from '@/types/userInforDate';
import MyProfileAddress from './MyProfileAddress';

interface userIdProps {
	userId: string;
}
export default function MyProfile({ userId }: userIdProps) {
	// 현재 유저 정보 배열
	const [userInfor, setUserInfor] = useState<useInforDateType[]>([]);
	// 수정 버튼
	const [changeInfor, setChangeInfor] = useState<boolean>(false);
	// 회원 정보 수정
	const [isEditingName, setIsEditingName] = useState(userInfor[0]?.name);
	const [isEditingEmail, setIsEditingEmail] = useState(userInfor[0]?.email);
	const [isEditingPhone, setIsEditingPhone] = useState(userInfor[0]?.phone);
	const [isEditingPassword, setIsEditingPassword] = useState<string>('');
	const [isEditingCheckPassword, setIsEditingCheckPassword] =
		useState<string>('');
	const supabase = createClient();

	console.log(userInfor);
	// 유저 정보 불러오기
	const getUserInfor = async () => {
		const { data, error } = await supabase
			.from('users')
			.select('*')
			.eq('id', userId);
		if (error) {
			console.log(error);
		} else {
			setUserInfor(data);
		}
	};

	useEffect(() => {
		// useId가 있으면 getUserInfor함수 호출
		if (userId) {
			getUserInfor();
		}
	}, [userId]); // userId가 변경될 때마다 실행

	// 1.회원 정보 수정을 눌르면 db정보가 안들어온다.
	// 2.그 이유는 useInfor 비동기적으로 업데이트 되지만, isEditingName, isEditingEmail, isEditingPhone userInfor가 업데이트되었을 때 자동으로 업데이트 되지않는다.
	// 3. userInfor 변경될때 name,email,phone을 업데이트 시켜준다.
	useEffect(() => {
		if (userInfor.length > 0) {
			setIsEditingName(userInfor[0].name);
			setIsEditingEmail(userInfor[0].email);
			setIsEditingPhone(userInfor[0].phone);
		}
	}, [userInfor]); // userInfor 상태가 변경될 때마다 실행

	// 회원정보 수정
	const changeUser = async () => {
		const { data, error } = await supabase.auth.updateUser({
			email: isEditingEmail,
			password: isEditingPassword,
		});
		if (error) throw error;
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (error) {
			console.log(error);
		}
		const userUpData = {
			name: isEditingName,
			email: isEditingEmail,
			phone: isEditingPhone,
		};
		const { data: users } = await supabase
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
			<ul className={styles.accordionWrapper}>
				{userInfor.map((item: any) => (
					<div className={styles.accodionRowSelection} key={item.id}>
						{changeInfor ? (
							<>
								<div className={styles.profileBtnWrapper}>
									<li className={styles.accordionWrapperItem}>
										<span className={styles.profileItemTitle}>고객명</span>
										<input
											type="text"
											name="name"
											value={isEditingName}
											onChange={(e) => setIsEditingName(e.target.value)}
											className={styles.profileInput}
										/>
									</li>
									<button
										className={styles.profileEditBtn}
										onClick={changeUser}>
										회원정보 저장
									</button>
								</div>
								<div className={styles.profilepasswordWrapper}>
									<li className={styles.accordionWrapperItem}>
										<span className={styles.profileItemTitle}>
											비밀번호 변경
										</span>
										<input
											type="password"
											name="password"
											className={styles.profileInputpassword}
											placeholder="영문, 숫자 포함 6자 이상"
											onChange={(e) => setIsEditingPassword(e.target.value)}
										/>
									</li>
									<li className={styles.accordionWrapperItem}>
										<span className={styles.profileItemTitle}>
											비밀번호 재확인
										</span>
										<input
											type="password"
											name="checkPassword"
											className={styles.profileInputpassword}
											placeholder="영문, 숫자 포함 6자 이상"
											onChange={(e) =>
												setIsEditingCheckPassword(e.target.value)
											}
										/>
									</li>
								</div>
								<li className={styles.accordionWrapperItem}>
									<span className={styles.profileItemTitle}>이메일</span>
									<input
										type="email"
										name="email"
										value={isEditingEmail}
										onChange={(e) => setIsEditingEmail(e.target.value)}
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
										<span className={styles.profileItemTitle}>고객명</span>
										<span className={styles.profileItem}>{item.name}</span>
									</li>
									<button
										className={styles.profileEditBtn}
										onClick={() => setChangeInfor(true)}>
										회원정보 수정
									</button>
								</div>
								<li className={styles.accordionWrapperItem}>
									<span className={styles.profileItemTitle}>비밀번호</span>
									<span className={styles.profileItem}>*********</span>
								</li>
								<li className={styles.accordionWrapperItem}>
									<span className={styles.profileItemTitle}>이메일</span>
									<span className={styles.profileItem}>{item.email}</span>
								</li>
								<li className={styles.accordionWrapperItem}>
									<span className={styles.profileItemTitle}>연락처</span>
									<span className={styles.profileItem}>{item.phone}</span>
								</li>
							</>
						)}
					</div>
				))}
				<MyProfileAddress
					userInfor={userInfor}
					getUserInfor={getUserInfor}
					isEditingName={isEditingName}
					setIsEditingName={setIsEditingName}
					setIsEditingPhone={setIsEditingPhone}
					isEditingPhone={isEditingPhone}
					userId={userId}
				/>
			</ul>
		</div>
	);
}
