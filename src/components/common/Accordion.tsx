'use client';
import styles from '@/styles/common/accordionlayout.module.css';
import Image from 'next/image';
import viewIcon from '../../../public/detail/view.png';
import closeIcon from '../../../public/detail/close.png';
import { useContext } from 'react';
import { AccordionContext } from './AccordionWrapper';

export default function Accordion({
	children,
	title,
	index,
}: {
	children: React.ReactNode;
	title: string;
	index: number;
}) {
	const { active, setActive } = useContext(AccordionContext);

	const eventHandler = (e: any, index: number) => {
		e.preventDefault();
		if (active.includes(index)) {
			// 클릭하지 않은 녀석들만 새로 뿌려준다
			setActive(active.filter((active) => active !== index));
		} else {
			setActive([...active, index]);
		}
	};

	return (
		<div
			className={
				active.includes(index) ? styles.activeStyle : styles.inactiveStyle
			}>
			<div
				onClick={(e) => eventHandler(e, index)}
				className={styles.accordionTitle}>
				<h2>{title}</h2>

				<Image
					src={active.includes(index) ? closeIcon : viewIcon}
					alt="closeImage"
					width={20}
					height={20}
				/>
			</div>
			{active.includes(index) && children}
		</div>
	);
}
