'use client';

import styles from '@/styles/not-found.module.css';
import Image from 'next/image';
import Img from '../../public/notFound.png';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function Notfound() {
	const router = useRouter();
	const goback = () => router.back();
	return (
		<div className={styles.container}>
			<Image src={Img} alt="img" width={400} height={200} />
			<div className={styles.notFountWrapper}>
				<p>찾으시는 페이지가 없습니다. 😂</p>
				<div>
					<Link href={'/'}>
						<p>메인 페이지로 돌아가기</p>
					</Link>
					<div onClick={goback}>
						<p>이전 페이지로 돌아가기</p>
					</div>
				</div>
			</div>
		</div>
	);
}
