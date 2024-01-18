import styles from '@/styles/detail/detaildata/detailsustainability.module.css';
import Link from 'next/link';
export default function Detailsustainability({ ...book }) {
	return (
		<div className={styles.accordionContent}>
			<ul className={styles.accordionWrapper}>
				<div className={styles.accodionRowSelection}>
					<li className={styles.accordionWrapperItem}>
						{/* <span className={styles.boookItemTitle}></span> */}
						<span className={styles.bookWarningText}>
							책 한 권을 제작하는 데에는 나무 한 그루와 1kg의 이산화 탄소가
							발생한다는 것을 알고 계시나요? <br />
							<br />
							매년 수백만 권의 버려진 책은 나무와 이산화 탄소의 낭비를
							야기합니다.
							<br />
							<br /> 중고책 구매를 선택함으로써 우리는 환경을 보호하고 아름다운
							지구를 함께 만들어 나갈 수 있습니다. <br />
							<br />
							우연도 여러분과 함께 나아가겠습니다! 함께 동참해요.
						</span>
					</li>
				</div>
				<div className={styles.accodionRowWarningSelection}>
					<li className={styles.accordionWrapperWarningItem}>
						<span className={styles.bookWarningItem}>{book.title}</span>
						<div className={styles.accodionWarningWrap}>
							<p className={styles.bookItem}>베르베르</p>
							<em className={styles.divice}></em>
							<p className={styles.bookItem}>{book.publisher}</p>
						</div>
						<p className={styles.bookUsedLinkQuestion}>
							이 책의 중고 서적이 궁금하다면?
						</p>
						<Link href={book.usedList.aladinUsed.link}>
							<button className={styles.bookUsedLinkBtn}>
								중고서적 구매하기
							</button>
						</Link>
					</li>
				</div>
			</ul>
		</div>
	);
}
