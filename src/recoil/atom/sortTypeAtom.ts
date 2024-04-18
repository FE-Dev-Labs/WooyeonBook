import { atom } from 'recoil';

// book item sort type
export const sortTypeState = atom<string>({
	key: 'sortType',
	default: 'title',
});
