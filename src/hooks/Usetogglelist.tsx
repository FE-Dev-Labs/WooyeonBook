'use client';
import { useState } from 'react';

export default function Usetogglelist() {
	const [openItemIds, setOpenItemIds] = useState<number[]>([]);

	// 2.  openItmeIds에 숫자 [2]가 클릭한 숫자 2라면 isOpen true가 되면서
	// 아래 Icon이 바뀌면서 해당 본문이 나온다.
	// 4. openItemIds에 [2,1] 배열에 들어가고 2번과 1번은 isOpen이 true가 되서 아코디언이 열린다.
	const isOpen = (itemId: number) => openItemIds.includes(itemId); // isOpen 함수를 수정합니다.

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
	return { toggleAccordion, isOpen };
}
