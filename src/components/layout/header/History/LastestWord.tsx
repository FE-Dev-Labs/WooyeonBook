import Image from 'next/image';
import Link from 'next/link';
import cancelIcon from '../../../../../public/layout/cancel.png';
import styles from '@/styles/layout/header/history/lastestWord.module.css';
export default function LastestWord() {
	return (
		<>
			<dl className={styles.lastesWordWrapper}>
				<dt>최근 검색어</dt>
				<dd className={styles.lastesWordWrap}>
					<ul className={styles.lastesUl}>
						<li className={styles.lastesLi}>
							<Link href="/">쇼펜하우어</Link>
							<Image src={cancelIcon} alt="cancelIcon" />
						</li>
					</ul>
				</dd>
			</dl>
		</>
	);
}
