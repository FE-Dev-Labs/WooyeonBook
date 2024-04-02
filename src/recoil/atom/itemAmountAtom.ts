import { atom } from 'recoil';

export const itemAmountAtom = atom<number>({
	key: 'itemAmountAtom',
	default: 1,
});
