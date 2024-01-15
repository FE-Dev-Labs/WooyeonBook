'use client';
import styles from '@/styles/common/accordionlayout.module.css';
import { useState } from 'react';
import Image from 'next/image';
import viewIcon from '../../../public/detail/view.png';
import closeIcon from '../../../public/detail/close.png';

export default function Accordionlayout({ ...book }) {
	const accodiontitle = [
		{ title: '설명', id: 1 },
		{ title: '정보고시', id: 2 },
		{ title: '지속가능성', id: 3 },
	];

	const [openItemIds, setOpenItemIds] = useState<number[]>([]);

	const toggleAccordion = (itemId: number) => {
		// 4. 내가 클릭한 openItemId와 itemId가 같지 않는 애들, 즉 내가 아코디언을 열고 다시 눌르지 않은 애들을 필터해서 SetOpenItemIds 넣어서 뿌려준다.
		// 5. 열려있는 아코디언의 itemId와 내가 클릭한 openItemIds에 있는 openItemId가 다르면 새로 뿌려주는것이다.
		if (openItemIds.includes(itemId)) {
			setOpenItemIds(openItemIds.filter((openItemId) => openItemId !== itemId));
		} else {
			// 1. 아코디언 2번 클릭하면 openItmeIds에 숫자 [2] 배열에 들어간다.
			// 3. 여기서 1번을 클릭하면 openItemIds에 숫자 [2,1] 배열에 들어간다.
			setOpenItemIds([...openItemIds, itemId]);
		}
	};
	return (
		<div className={styles.accordionContainer}>
			{accodiontitle.map((item) => {
				// 2.  openItmeIds에 숫자 [2]가 클릭한 숫자 2라면 isOpen true가 되면서
				// 아래 Icon이 바뀌면서 해당 본문이 나온다.
				// 4. openItemIds에 [2,1] 배열에 들어가고 2번과 1번은 isOpen이 true가 되서 아코디언이 열린다.
				const isOpen = openItemIds.includes(item.id);

				return (
					<div
						className={
							styles.accordionWrapper + (isOpen ? ' ' + styles.active : '')
						}
						key={item.id}>
						<div
							className={styles.accordionTitle}
							onClick={() => toggleAccordion(item.id)}>
							<h2>{item.title}</h2>
							{isOpen ? (
								<Image src={viewIcon} alt="plusImage" width={20} height={20} />
							) : (
								<Image
									src={closeIcon}
									alt="closeImage"
									width={20}
									height={20}
								/>
							)}
						</div>

						{/*설명란 */}

						{isOpen && item.title === '설명' && (
							<div className={styles.accordionContent}>
								<ul className={styles.accordionwrapper}>
									<div className={styles.accodionRowSelection}>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>도서명</span>
											<span className={styles.bookItem}>{book.title}</span>
										</li>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>지음/옮김</span>
											<span className={styles.bookItem}>{book.author}</span>
										</li>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>주제 분류</span>
											<span className={styles.bookItem}>
												{book.categoryName}
											</span>
										</li>
									</div>
									<li className={styles.accordionwrapperItem}>
										<span className={styles.boookItemTitle}>책소개</span>
										<span className={styles.bookItem}>{book.description}</span>
									</li>
								</ul>
							</div>
						)}

						{/*정보고시란 */}

						{isOpen && item.title === '정보고시' && (
							<div className={styles.accordionContent}>
								<ul
									className={
										styles.accordionwrapper +
										(isOpen ? ' ' + styles.active : '')
									}>
									<div className={styles.accodionRowSelection}>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>출간일</span>
											<span className={styles.bookItem}>{book.pubDate}</span>
										</li>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>출판사</span>
											<span className={styles.bookItem}>{book.publisher}</span>
										</li>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>읽는 순서</span>
											<span className={styles.bookItem}>{book.startIndex}</span>
										</li>
									</div>
									<div className={styles.accodionRowSelection}>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>ISBN</span>
											<span className={styles.bookItem}>{book.isbn}</span>
										</li>

										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>크기</span>
											<span className={styles.bookItem}>
												{book.packing.sizeWidth}*{book.packing.sizeHeight}mm
											</span>
										</li>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>쪽수</span>
											<span className={styles.bookItem}>{book.itemPage}</span>
										</li>
									</div>
									<div className={styles.accodionRowSelection}>
										<li className={styles.accordionwrapperItem}>
											<span className={styles.boookItemTitle}>판형</span>
											<span className={styles.bookItem}>
												{book.packing.styleDesc}
											</span>
										</li>
									</div>
								</ul>
							</div>
						)}
						{/*지속가능성란 */}

						{isOpen && item.title === '지속가능성' && (
							<div className={styles.accordionContent}>
								<ul className={styles.accordionwrapper}>
									<div className={styles.accodionRowSelection}>
										<li className={styles.accordionwrapperItem}>
											{/* <span className={styles.boookItemTitle}></span> */}
											<span className={styles.bookWarningText}>
												책 한 권을 제작하는 데에는 나무 한 그루와 1kg의 이산화
												탄소가 발생한다는 것을 알고 계시나요? <br />
												<br />
												매년 수백만 권의 버려진 책은 나무와 이산화 탄소의 낭비를
												야기합니다.
												<br />
												<br /> 중고책 구매를 선택함으로써 우리는 환경을 보호하고
												아름다운 지구를 함께 만들어 나갈 수 있습니다. <br />
												<br />
												우연도 여러분과 함께 나아가겠습니다! 함께 동참해요.
											</span>
										</li>
									</div>
									<div className={styles.accodionRowWarningSelection}>
										<li className={styles.accordionwrapperWarningItem}>
											<span className={styles.bookWarningItem}>
												{book.title}
											</span>
											<div className={styles.accodionWarningWrap}>
												<p className={styles.bookItem}>베르베르</p>
												<em className={styles.divice}></em>
												<p className={styles.bookItem}>{book.publisher}</p>
											</div>
											<p className={styles.bookUsedLinkQuestion}>
												이 책의 중고 서적이 궁금하다면?
											</p>
											<button className={styles.bookUsedLinkBtn}>
												중고서적 구매하기
											</button>
										</li>
									</div>
								</ul>
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
