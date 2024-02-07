import Link from 'next/link';
import styles from '@/styles/layout/header/history/hotWord.module.css';
import Image from 'next/image';
import lineIcon from '../../../../../public/layout/line.png';
export default function HotWord() {
	return (
		<dl className={styles.hotWordWrapper}>
			<dt className={styles.hotWordTxt}>
				인기 검색어
				<span className={styles.hotWordDate}>2024.02.07</span>
			</dt>
			<dd>
				<ol className={styles.hotWordPopularWrap}>
					<li className={styles.hotWordPopularLi}>
						<Link href={'/'} passHref legacyBehavior>
							<a className={styles.hotWordLink}>
								<span className={styles.hotWordNum}>1</span>
								<span className={styles.hotWordTitle}>구의 증명</span>
								<Image
									src={lineIcon}
									alt="lineIcon"
									className={styles.lineIcon}
									width={15}
									height={2}
								/>
							</a>
						</Link>
					</li>
					<li className={styles.hotWordPopularLi}>
						<Link href={'/'} passHref legacyBehavior>
							<a className={styles.hotWordLink}>
								<span className={styles.hotWordNum}>2</span>
								<span className={styles.hotWordTitle}>쇼펜하우어</span>
								<Image
									src={lineIcon}
									alt="lineIcon"
									className={styles.lineIcon}
									width={15}
									height={2}
								/>
							</a>
						</Link>
					</li>
					<li className={styles.hotWordPopularLi}>
						<Link href={'/'} passHref legacyBehavior>
							<a className={styles.hotWordLink}>
								<span className={styles.hotWordNum}>3</span>
								<span className={styles.hotWordTitle}>영어</span>
								<Image
									src={lineIcon}
									alt="lineIcon"
									className={styles.lineIcon}
									width={15}
									height={2}
								/>
							</a>
						</Link>
					</li>
					<li className={styles.hotWordPopularLi}>
						<Link href={'/'} passHref legacyBehavior>
							<a className={styles.hotWordLink}>
								<span className={styles.hotWordNum}>4</span>
								<span className={styles.hotWordTitle}>자기계발</span>
								<Image
									src={lineIcon}
									alt="lineIcon"
									className={styles.lineIcon}
									width={15}
									height={2}
								/>
							</a>
						</Link>
					</li>
				</ol>
			</dd>
		</dl>
	);
}
