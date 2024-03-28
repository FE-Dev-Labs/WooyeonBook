import { CartItemType } from '@/types/bookType';
import { atom } from 'recoil';

export const cartAtom = atom<CartItemType[]>({
	key: 'cartAtom',
	default: [],
});
