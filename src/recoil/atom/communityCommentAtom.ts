import { atom } from 'recoil';

export const isUpdateState = atom<string>({
	key: 'isUpdateState',
	default: '',
});
export const updateComment = atom<string>({
	key: 'updateComment',
	default: '',
});
