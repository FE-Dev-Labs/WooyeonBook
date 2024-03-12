import Image from 'next/image';
import Link from 'next/link';
import cancelIcon from '../../../../../public/layout/cancel.png';
import styles from '@/styles/layout/header/history/lastestWord.module.css';
import { useLocalStorage } from '@/hooks/useLocalStorage';
export default function LastestWord() {
	// 최근 검색어 로컬스토리지 불러오는 로직
	const { storedValue, removeKeyword } = useLocalStorage('searchKeywords', []);

	return (
		<>
			<dl className={styles.lastesWordWrapper}>
				<dt className={styles.lastesWordTxt}>최근 검색어</dt>
				<dd className={styles.lastesWordWrap}>
					<ul className={styles.lastesUl}>
						{storedValue.length ? (
							storedValue.map((lastestword, index) => (
								<li key={index} className={styles.lastesLi}>
									<Link href={'/'} passHref legacyBehavior>
										<a className={styles.lastesLink}>{lastestword}</a>
									</Link>
									<Image
										src={cancelIcon}
										alt="cancelIcon"
										width={10}
										height={10}
										className={styles.cancelIcon}
										onMouseDown={() => removeKeyword(lastestword)}
									/>
								</li>
							))
						) : (
							<div className={styles.lastesNoArrayText}>
								최근 검색어가 없습니다
							</div>
						)}
					</ul>
				</dd>
			</dl>
		</>
	);
}
