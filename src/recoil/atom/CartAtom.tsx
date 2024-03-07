import { atom } from 'recoil';

export const CartAtom = atom<string | number>({
	key: 'CartAtom',
	default: '',
});
