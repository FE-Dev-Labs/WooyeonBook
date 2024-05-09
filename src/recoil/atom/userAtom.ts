import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const isBrowser = typeof window !== 'undefined';

const { persistAtom: persistUserAtom } = recoilPersist({
	key: 'user-persist', // 로컬 스토리지에 저장될 때 사용될 key
	storage: isBrowser ? localStorage : undefined, // 사용할 스토리지 타입(로컬)
});

export const userAtom = atom({
	key: 'userState',
	default: {
		id: null,
		name: null,
		email: undefined,
		phone: null,
	},
	effects_UNSTABLE: [persistUserAtom],
});

// export const userIdAtom = atom<string | null>({
// 	key: 'userIdState',
// 	default: null,
// 	effects_UNSTABLE: [persistUserAtom],
// });

// export const userNameAtom = atom<string | null>({
// 	key: 'userNameState',
// 	default: null,
// 	effects_UNSTABLE: [persistUserAtom],
// });

// export const userEmailAtom = atom<string | undefined>({
// 	key: 'userEmailState',
// 	default: undefined,
// 	effects_UNSTABLE: [persistUserAtom],
// });

// export const userPhoneAtom = atom<string | null>({
// 	key: 'userPhoneState',
// 	default: null,
// 	effects_UNSTABLE: [persistUserAtom],
// });
