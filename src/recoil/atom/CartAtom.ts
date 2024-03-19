import { atom } from 'recoil';

export const cartAtom = atom<string | number>({
	key: 'cartAtom',
	default: '',
});
