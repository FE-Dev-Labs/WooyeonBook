import styles from '@/styles/not-found.module.css';
import Image from 'next/image';
import Img from '../../public/notFound.png';
export default function Notfound() {
	return (
		<div className={styles.container}>
			<Image src={Img} alt="img" width={600} height={300} />
			<div className={styles.text}>찾으시는 페이지가 없습니다 🥲</div>
			<div className={styles.btnWrap}>
				<button>홈으로 돌아가기</button>
				<button>이전 페이지로 돌아가기</button>
			</div>
		</div>
	);
}
