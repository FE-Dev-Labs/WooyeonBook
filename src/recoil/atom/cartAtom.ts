import { CartItemType } from '@/types/bookType';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'recoil-persist', // 로컬 스토리지에 저장될 때 사용될 key
	storage: localStorage, // 사용할 스토리지 타입(로컬)
});

export const cartAtom = atom<CartItemType[]>({
	key: 'cartAtom',
	default: [],
	effects_UNSTABLE: [persistAtom], // atom 상태를 로컬 스토리지에 저장(recoil-persist 설치 후)
});
