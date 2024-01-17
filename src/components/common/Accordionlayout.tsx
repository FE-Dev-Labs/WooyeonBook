'use client';
import styles from '@/styles/common/accordionlayout.module.css';
import Image from 'next/image';
import viewIcon from '../../../public/detail/view.png';
import closeIcon from '../../../public/detail/close.png';
import Link from 'next/link';
import Usetogglelist from '@/hooks/Usetogglelist';
import Detailexplanation from '../detail/detaildata/detailexplanation';
import Detailinformation from '../detail/detaildata/detailinformation';
import Detailsustainability from '../detail/detaildata/detailsustainability';

export default function Accordionlayout({ ...book }) {
	const accordiontitle = [
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
						</div>
					);
				})}
			</div>
		</div>
	);
}
