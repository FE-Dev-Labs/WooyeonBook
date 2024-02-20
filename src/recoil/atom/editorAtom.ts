import { atom } from 'recoil';

// editor text
export const editorText = atom({
	key: 'editorText',
	default: '',
});

export const editorImgArr = atom({
	key: 'editorImgArr',
	default: [],
});
