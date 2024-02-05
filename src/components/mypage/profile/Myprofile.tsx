import styles from '@/styles/mypage/profile/profile.module.css';
export default function Myprofile() {
	return (
		<div>
			<ul className={styles.accordionWrapper}>
				<div className={styles.accodionRowSelection}>
					<div className={styles.profileBtnWrapper}>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.profileItemTitle}>고객명</span>
							<span className={styles.profileItem}>박진양</span>
						</li>
						<button className={styles.profileEditBtn}>회원정보 수정</button>
					</div>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.profileItemTitle}>비밀번호</span>
						<span className={styles.profileItem}>*****</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.profileItemTitle}>이메일</span>
						<span className={styles.profileItem}>dbsskdud60@gmail.com</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.profileItemTitle}>연락처</span>
						<span className={styles.profileItem}>010-0000-0000</span>
					</li>
				</div>
				<div className={styles.accodionRowSelection}>
					<div className={styles.profileBtnWrapper}>
						<li className={styles.accordionWrapperItem}>
							<span className={styles.profileItemTitle}>수령인</span>
							<span className={styles.profileItem}>박진양</span>
						</li>
						<button className={styles.profileEditBtn}>주소록 관리</button>
					</div>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.profileItemTitle}>주소</span>
						<span className={styles.profileItem}>
							[0000]서울특별시 진양시 진양구 진양동 231-123 가자룸 606호
						</span>
					</li>
					<li className={styles.accordionWrapperItem}>
						<span className={styles.profileItemTitle}>연락처</span>
						<span className={styles.profileItem}>010-0000-0000</span>
					</li>
				</div>
			</ul>
		</div>
	);
}
