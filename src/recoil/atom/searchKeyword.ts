import { atom } from 'recoil';

export const searchKeyword = atom<string | number | Date>({
	key: 'searchKeyword',
	default: '',
});
