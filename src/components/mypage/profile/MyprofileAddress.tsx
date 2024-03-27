'use client';
import styles from '@/styles/mypage/profile/profile.module.css';
import { useInforDateType } from '@/types/userInforDate';
import { useEffect, useState } from 'react';
interface useridprops {
	userInfor: useInforDateType[];
}
export default function MyprofileAddress({ userInfor }: useridprops) {
	return (
		<div>
			{userInfor.map((item: any) => (
				<div className={styles.accodionRowSelection} key={item.id}>
					<div className={styles.profileBtnWrapper}>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.profileItemTitle}>수령인</span>
							<span className={styles.profileItem}>{item.name}</span>
						</li>
						<button className={styles.profileEditBtn}>주소록 관리</button>
					</div>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.profileItemTitle}>주소</span>
						<div className={styles.addressWrapper}>
							<span className={styles.profileItemZipcode}>{item.zipcode}</span>
							<span className={styles.profileItemAddress}>{item.address}</span>
							<span className={styles.profileItem}>{item.detailaddress}</span>
						</div>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.profileItemTitle}>연락처</span>
						<span className={styles.profileItem}>{item.phone}</span>
					</li>
				</div>
			))}
		</div>
	);
}
