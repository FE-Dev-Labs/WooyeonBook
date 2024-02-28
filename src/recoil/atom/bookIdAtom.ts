import { atom, selector } from 'recoil';

export const selectBookData = atom({
	key: 'selectBookData',
	default: {
		bookName: '',
		bookImgUrl: '',
		bookId: '',
	},
});

export const book_id = selector({
	key: 'book_Id',
	get: ({ get }) => {
		const bookData = get(selectBookData);
		return bookData.bookId;
	},
});

export const book_name = selector({
	key: 'bookName',
	get: ({ get }) => {
		const bookData = get(selectBookData);
		return bookData.bookName;
	},
});

export const book_img_url = selector({
	key: 'bookImgUrl',
	get: ({ get }) => {
		const bookData = get(selectBookData);
		return bookData.bookImgUrl;
	},
});
