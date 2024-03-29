import Link from 'next/link';
import Image from 'next/image';
import styles from '@/styles/common/themeItem.module.css';
import bookImage from '../../../public/main/book2.jpg';

export default function ThemItem() {
	return (
		<div>
			<Link href={'/'}>
				<div className={styles.themeItem}>
					<div className={styles.themeText}>
						<p>끝없는 상상의 바다</p>
						<p># 일반소설</p>
					</div>
					<div className={styles.themeImage}>
						<Image src={bookImage} alt="theme book" width={150} height={200} />
					</div>
				</div>
			</Link>
		</div>
	);
}
