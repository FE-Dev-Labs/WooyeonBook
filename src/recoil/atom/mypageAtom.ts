import { atom } from 'recoil';

export const mypage_QS = atom({
	key: 'mypage_QS',
	default: {
		page: 'bookReport',
		sort: '',
		categories: '',
		num: '',
	},
});
