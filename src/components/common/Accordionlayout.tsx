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

	//openItemId를 null로 설정하는 이유는 초기 상태에서는 어떤 아이템도 열리지 않은 상태를 의미 // null은 아이템이 열리지 않았음을 나타내는 값으로 사용되며, 이를 통해 초기에는 모든 아이템이 닫힌 상태로 시작할 수 있음
	const [openItemId, setOpenItemId] = useState(null);
	const toggleAccordin = (itemId: any) => {
		setOpenItemId(itemId === openItemId ? null : itemId);
	};

	return (
		<div className={styles.accordionContainer}>
			{accodiontitle.map((item) => {
				const isOpen = item.id === openItemId;
				return (
					<div
						className={
							styles.accordionWrapper + (isOpen ? ' ' + styles.active : '')
						}
						key={item.id}>
						<div
							className={styles.accordionTitle}
							onClick={() => toggleAccordin(item.id)}>
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
						{item.id === openItemId && (
							<div className={styles.accordionContent}>
								{item.title === '설명' && (
									<>
										<p>{book.publisher}</p>
									</>
								)}
							</div>
						)}
					</div>
				);
			})}
		</div>
	);
}
