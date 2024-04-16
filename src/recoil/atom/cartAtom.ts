import { CartItemType } from '@/types/bookType';
import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 04-10 기존 나타나지 않던 "localStorage is not defined" 에러 메시지로 인한 추가 코드(SSR 환경이 아닌 브라우저 환경인지 타입 검사)
const isBrowser = typeof window !== 'undefined';

const { persistAtom: persistCartAtom } = recoilPersist({
	key: 'cart-persist', // 로컬 스토리지에 저장될 때 사용될 key
	// 04-10 기존 나타나지 않던 "localStorage is not defined" 에러 메시지로 인한 추가 코드(SSR 환경이 아닌 브라우저 환경인지 타입 검사)
	storage: isBrowser ? localStorage : undefined, // 사용할 스토리지 타입(로컬)
});

export const cartAtom = atom<CartItemType[]>({
	key: 'cartAtom',
	default: [],
	effects_UNSTABLE: [persistCartAtom], // atom 상태를 로컬 스토리지에 저장(recoil-persist 설치 후)
});
