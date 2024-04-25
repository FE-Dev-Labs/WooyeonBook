import styles from '@/styles/mypage/profile/profile.module.css';
import DaumPostcode from 'react-daum-postcode';
import closeWhiteIcon from '@/assets/common/closeWhiteIcon.png';
import Image from 'next/image';
interface profileDaumPorps {
	setIsOpen: any;
	setIsEditingZipcode: any;
	setIsEditingAddress: any;
}
export default function MyProfileDaumApi({
	setIsOpen,
	setIsEditingZipcode,
	setIsEditingAddress,
}: profileDaumPorps) {
	const handleComplete = (data: any) => {
		setIsEditingZipcode(data.zonecode);
		setIsEditingAddress(data.roadAddress);
		setIsOpen(false);
	};
	return (
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
	);
}
