'use client';
import { Dispatch, SetStateAction, createContext, useState } from 'react';
import styles from '@/styles/common/accordionLayout.module.css';

//  AccordionContext 객체의 기본 값
interface AccordionProps {
	active: number[];
	setActive: Dispatch<SetStateAction<number[]>>;
}
export const AccordionContext = createContext<AccordionProps>({
	active: [],
	setActive: () => {},
});

const AccordionWrapper = (props: any) => {
	// 기본값을 0으로 지정하여 첫번째 배열인 0번은 항상 아코디언이 열리게 0추가
	const [active, setActive] = useState<number[]>([0]);

	return (
		<AccordionContext.Provider
			value={{
				active,
				setActive,
			}}>
			<div className={styles.accordionContainer}>{props.children}</div>
		</AccordionContext.Provider>
	);
};

export default AccordionWrapper;
