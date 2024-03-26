// import { Book, ResponseData } from '@/types/bookDetailDate';
// import { NewBookType } from '@/types/bookType';
// // import { useEffect } from 'react';

// interface useLocalProp {
// 	itemId: number;
// 	itemCover: string;
// }

// export default function useLocal({ itemId, itemCover }: useLocalProp) {
// 	useEffect(() => {
// 		// 최근 본 상품 목록을 로컬 스토리지에서 가져오기
// 		const storedItems = localStorage.getItem('recentItems');
// 		let recentItems = storedItems ? JSON.parse(storedItems) : [];

// 		// 현재 아이템 정보
// 		const currentItem = { itemId, itemCover };

// 		// 이미 리스트에 같은 아이템이 있는지 체크하고, 있다면 제거함
// 		recentItems = recentItems.filter(
// 			(item: NewBookType) => item.itemId !== itemId,
// 		);

// 		// 현재 아이템을 리스트의 앞부분에 추가
// 		recentItems.unshift(currentItem);

// 		// 리스트가 9개를 넘으면 마지막 아이템을 제거
// 		if (recentItems.length > 9) {
// 			recentItems.pop();
// 		}

// 		// 업데이트된 리스트를 로컬 스토리지에 저장
// 		localStorage.setItem('recentItems', JSON.stringify(recentItems));
// 	}, [itemId]);
// }
