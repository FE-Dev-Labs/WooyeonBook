import { atom } from 'recoil';

// editor text
export const editorText = atom<string>({
	key: 'editorText',
	default: '',
});

export const editorImgArr = atom<string[]>({
	key: 'editorImgArr',
	default: [],
});
