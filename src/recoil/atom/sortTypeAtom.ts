import { atom } from 'recoil';

// book item sort type
export const sortTypeAtom = atom<string>({
	key: 'sortTypeAtom',
	default: 'title',
});
