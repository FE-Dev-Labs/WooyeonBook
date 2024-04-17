import { atom } from 'recoil';

export const queryString = atom({
	key: 'queryString',
	default: {
		sort: '',
		q: '',
		categories: '',
		num: '',
	},
});
