import { atom } from 'recoil';

export const CartAtom = atom({
	key: 'CartAtom',
	default: [],
});

// export const CartAtom = atom<CartItem[]>({
// 	key: 'CartAtom',
// 	default: [],
// });
