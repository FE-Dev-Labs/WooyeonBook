import { MutableRefObject, useEffect } from 'react';

interface useOutsideClickType {
	ref: MutableRefObject<HTMLElement | null>;
	handler: (e: MouseEvent) => void;
}
const useOutsideClick = ({ ref, handler }: useOutsideClickType) => {
	const listener = (event: MouseEvent) => {
		// ----------------!ref.current----------------
		// !ref.current 참조하려는 요소가 아직 존재하지 않는다라는 뜻
		// 만약 DOM에 생성되지 않았다면 ref.current null이 된다.
		// !ref.current true가 되어 조건문 실행 함수는 아무런 작업 수행하지 않고 종료 return을 하게된다.
		// -------ref.current.contains(event.target as Node)-------
		// event.target이 ref.current의 내부에 있을 경우 함수를 종료해라

		// 결국 이 두 조건은 외부 클릭을 감지하는 것이 목표
		// 우리가 참조하려는 요소가 준비되지 않았거나 사용자가 클릭한 곳이
		// 참조하려는 요소의 내부가 아니라면 외부 클릭이 아니므로 아무런 동작하지 않고 함수 종료
		if (!ref.current || ref.current.contains(event.target as Node)) {
			return;
		}
		// 위 두 조건이 모두 만족되지 않는다면, ref.current가 존재하고 클릭된 요소가 ref.current의 외부에 있다면 handler(event) 를 실행, 외부 클릭이 발생했을때 수행할 동작 정의
		handler(event);
	};

	useEffect(() => {
		window.addEventListener('mousedown', listener);
		return () => {
			window.removeEventListener('mousedown', listener);
		};
	}, [ref, handler]);
};
export default useOutsideClick;
