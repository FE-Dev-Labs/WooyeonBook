'use client';
import styles from '@/styles/common/accordionlayout.module.css';
import Image from 'next/image';
import viewIcon from '../../../public/detail/view.png';
import closeIcon from '../../../public/detail/close.png';
import Usetogglelist from '@/hooks/Usetogglelist';
import Detailexplanation from '../detail/detaildata/Detailexplanation';
import Detailinformation from '../detail/detaildata/Detailinformation';
import Detailsustainability from '../detail/detaildata/Detailsustainability';
import Detailcomment from './../detail/detailcomments/Detailcomment';
import Myprofile from './../mypage/profile/Myprofile';
import Myorder from '../mypage/myorder/Myorder';
import Communitynav from './Communitynav';
import { testdatalist } from '@/apis/testdatalist';
import Postaccordionlayout from './Postaccordionlayout';

interface mypageProps {
	isMypage: boolean;
}

export default function Accordionlayout({ isMypage, ...book }: mypageProps) {
	// isMpage true이면 mypage에서 5,6,7만 map을 돌려서 아코디언 레이아웃을 보여준다.
	const accordiontitle = isMypage
		? [
				{ title: '내가쓴글', id: 5 },
				{ title: '회원정보', id: 6 },
				{ title: '주문내역', id: 7 },
			]
		: [
				{ title: '설명', id: 1 },
				{ title: '정보고시', id: 2 },
				{ title: '지속가능성', id: 3 },
				{ title: '한줄평', id: 4 },
			];

	const { toggleAccordion, isOpen } = Usetogglelist();
	return (
		<div className={styles.accordionBackColor}>
			<div className={styles.accordionContainer}>
				{accordiontitle.map((item) => {
					// isOpen(item.id)의 true와 false를 isItemOpen에 넘겨준다
					const isItemOpen = isOpen(item.id);
					return (
						<div
							className={
								styles.accordionWrapper +
								(isItemOpen ? ' ' + styles.active : '')
							}
							key={item.id}>
							<div
								className={styles.accordionTitle}
								onClick={() => toggleAccordion(item.id)}>
								<h2>{item.title}</h2>
								{isItemOpen ? (
									<Image
										src={closeIcon}
										alt="closeImage"
										width={20}
										height={20}
									/>
								) : (
									<Image
										src={viewIcon}
										alt="plusImage"
										width={20}
										height={20}
									/>
								)}
							</div>

							{/*-----------디테일 페이지-----------*/}
							{/*설명란 */}
							{isItemOpen && item.title === '설명' && (
								<Detailexplanation {...book} />
							)}

							{/*정보고시란 */}

							{isItemOpen && item.title === '정보고시' && (
								<Detailinformation {...book} isItemOpen={isItemOpen} />
							)}
							{/*지속가능성란 */}

							{isItemOpen && item.title === '지속가능성' && (
								<Detailsustainability {...book} />
							)}

							{/*댓글란 */}
							{isItemOpen && item.title === '한줄평' && <Detailcomment />}

							{/*-----------마이 페이지-----------*/}
							{/* 내가쓴글란 */}
							{isItemOpen && item.title === '내가쓴글' && isMypage && (
								<>
									<Communitynav />
									{testdatalist.map((list) => {
										return (
											<div className={styles.postAccordionContainer}>
												<div className={styles.postAccordionWrapper}>
													<Postaccordionlayout list={list} />
												</div>
											</div>
										);
									})}
								</>
							)}
							{/* 회원정보란 */}
							{isItemOpen && item.title === '회원정보' && isMypage && (
								<Myprofile />
							)}
							{/* 회원정보란 */}
							{isItemOpen && item.title === '주문내역' && isMypage && (
								<Myorder />
							)}
						</div>
					);
				})}
			</div>
		</div>
	);
}
