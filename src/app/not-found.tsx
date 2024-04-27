'use client';
import styles from '@/styles/not-found.module.css';
import Image from 'next/image';
import notFoundImage from '@/assets/notFound/notFoundImage.png';
import { useRouter } from 'next/navigation';

export default function Notfound() {
	// useRouter 호출
	const router = useRouter();
	return (
		<div className={styles.container}>
			<div className={styles.wrapper}>
				<Image src={notFoundImage} alt="img" width={400} height={400} />
				<div className={styles.textWrpper}>
					<h1 className={styles.text}>해당 페이지를 찾을 수 없습니다.</h1>
					<p className={styles.p}>
						페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.
					</p>
					<p>입력하신 주소가 정확한지 다시 확인해주세요.</p>
					<p
						className={styles.p2}
						onClick={() => {
							router.push('/');
						}}>
						메인 페이지로 돌아가기
					</p>
				</div>
			</div>
		</div>
	);
}
