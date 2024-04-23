import { atom } from 'recoil';

export const CurrentPageAtom = atom<number>({
	key: 'currentPageAtom',
	default: 1,
});
