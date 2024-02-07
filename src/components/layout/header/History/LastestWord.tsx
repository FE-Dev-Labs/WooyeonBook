import Image from 'next/image';
import Link from 'next/link';
import cancelIcon from '../../../../../public/layout/cancel.png';
import styles from '@/styles/layout/header/history/lastestWord.module.css';
export default function LastestWord() {
	return (
		<>
			<dl className={styles.lastesWordWrapper}>
				<dt className={styles.lastesWordTxt}>최근 검색어</dt>
				<dd className={styles.lastesWordWrap}>
					<ul className={styles.lastesUl}>
						<li className={styles.lastesLi}>
							<Link href={'/'} passHref legacyBehavior>
								<a className={styles.lastesLink}>쇼펜하우어</a>
							</Link>
							<Image
								src={cancelIcon}
								alt="cancelIcon"
								width={10}
								height={10}
								className={styles.cancelIcon}
							/>
						</li>
					</ul>
				</dd>
			</dl>
		</>
	);
}
