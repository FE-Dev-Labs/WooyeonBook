import { atom } from 'recoil';

export const zipcodeAtom = atom<string>({
	key: 'zipcodeAtom',
	default: '',
});

export const roadAddressAtom = atom<string>({
	key: 'roadAddressAtom',
	default: '',
});

export const detailAddressAtom = atom<string>({
	key: 'detailAddressAtom',
	default: '',
});
