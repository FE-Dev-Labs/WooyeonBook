import { atom } from 'recoil';

export const zipcodeAtom = atom<string>({
	key: 'zipcodeAtom',
	default: '',
});

export const addressAtom = atom<string>({
	key: 'addressAtom',
	default: '',
});

export const detailAddressAtom = atom<string>({
	key: 'detailAddressAtom',
	default: '',
});
