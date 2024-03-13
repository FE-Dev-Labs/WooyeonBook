// import { useEffect, useState } from 'react';

// export const useLocalStorage = (
// 	key: string,
// 	initialValue: string[], // 초기값의 타입을 string[]로 변경
// ) => {
// 	// 로컬 스토리지에서 초기값을 불러오는 함수
// 	const getItem = () => {
// 		if (typeof window === 'undefined') {
// 			return initialValue;
// 		}
// 		try {
// 			const item = window.localStorage.getItem(key);
// 			return item ? JSON.parse(item) : initialValue;
// 		} catch (error) {
// 			console.log(error);
// 			return initialValue;
// 		}
// 	};

// 	// 값을 로컬 스토리지에 저장하는 함수
// 	const [storedValue, setStoredValue] = useState<string[]>(getItem);

// 	// 컴포넌트가 마운트 될 때 getItem을 호출하여 상태를 초기화합니다.
// 	useEffect(() => {
// 		setStoredValue(getItem());
// 	}, [key]);

// 	const setItem = (value: string[]) => {
// 		if (typeof window !== 'undefined') {
// 			try {
// 				// 새로운 값을 설정
// 				setStoredValue(value);
// 				// 로컬 스토리지에 저장
// 				window.localStorage.setItem(key, JSON.stringify(value));
// 			} catch (error) {
// 				console.log(error);
// 			}
// 		}
// 	};
// 	// 검색어를 로컬 스토리지에 추가하는 함수
// 	const addKeyword = (keyword: string) => {
// 		console.log('키워드찾기', keyword);
// 		if (typeof keyword === 'string' && keyword.trim() !== '') {
// 			// 새로운 키워드를 추가하기 전에 현재 저장된 키워드의 배열을 복사하고,
// 			// 최신 검색어가 배열의 앞쪽에 오도록 한다.
// 			// 여기서는 최대 10개의 이전 검색어만 유지하고, 새로운 검색어를 추가함으로써
// 			// 총 개수가 11개를 넘지 않도록 합니다.
// 			const newKeywords = [keyword, ...storedValue.slice(0, 10)];
// 			setItem(newKeywords);
// 		} else {
// 			console.error('Invalid keyword:', keyword);
// 		}
// 	};

// 	// onSubmit 로컬스토리지 추가하는 함수
// 	const handleSubmitKeyword = (keyword: string) => {
// 		// addKeyword를 호출하여 handleSubmit에서 넘겨진 키워드를 배열에 추가
// 		addKeyword(keyword);
// 	};

// 	// }
// 	// 단일 검색어 삭제
// 	const removeKeyword = (keywordToRemove: string) => {
// 		// 인덱스가 아닌 실제 문자열 키워드로 변경
// 		const nextKeywords = storedValue.filter(
// 			(keyword) => keyword !== keywordToRemove,
// 		);
// 		setItem(nextKeywords);
// 	};

// 	// 전체 검색어 삭제
// 	const removeAllKeywords = () => {
// 		setItem([]);
// 	};
// 	return {
// 		getItem,
// 		addKeyword,
// 		removeKeyword,
// 		removeAllKeywords,
// 		storedValue,
// 		handleSubmitKeyword,
// 	};
// };
import { useEffect, useState } from 'react';

export const useLocalStorage = (
	key: string,
	initialValue: string[], // 초기값의 타입을 string[]로 변경
) => {
	// 로컬 스토리지에서 초기값을 불러오는 함수
	const getItem = () => {
		if (typeof window === 'undefined') {
			return initialValue;
		}
		try {
			const item = window.localStorage.getItem(key);
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			console.log(error);
			return initialValue;
		}
	};

	// 값을 로컬 스토리지에 저장하는 함수
	const [storedValue, setStoredValue] = useState<string[]>(getItem);

	// 컴포넌트가 마운트 될 때 getItem을 호출하여 상태를 초기화합니다.
	useEffect(() => {
		setStoredValue(getItem());
	}, [key]);

	const setItem = (value: string[]) => {
		if (typeof window !== 'undefined') {
			try {
				// 새로운 값을 설정
				setStoredValue(value);
				// 로컬 스토리지에 저장
				window.localStorage.setItem(key, JSON.stringify(value));
			} catch (error) {
				console.log(error);
			}
		}
	};

	// 검색어를 로컬 스토리지에 추가하는 함수
	const addKeyword = (keyword: string) => {
		if (typeof keyword === 'string' && keyword.trim() !== '') {
			// 새로운 키워드를 추가하기 전에 현재 저장된 키워드의 배열을 복사하고,
			// 최신 검색어가 배열의 앞쪽에 오도록 한다.
			// 여기서는 최대 10개의 이전 검색어만 유지하고, 새로운 검색어를 추가함으로써
			// 총 개수가 11개를 넘지 않도록 합니다.
			const newKeywords = [keyword, ...storedValue.slice(0, 10)];
			setItem(newKeywords);
		} else {
			console.error('Invalid keyword:', keyword);
		}
	};

	// onSubmit 로컬스토리지 추가하는 함수
	const handleSubmitKeyword = (keyword: string) => {
		// addKeyword를 호출하여 handleSubmit에서 넘겨진 키워드를 배열에 추가
		addKeyword(keyword);
	};

	// 단일 검색어 삭제
	const removeKeyword = (keywordToRemove: string) => {
		// 인덱스가 아닌 실제 문자열 키워드로 변경
		const nextKeywords = storedValue.filter(
			(keyword) => keyword !== keywordToRemove,
		);
		setItem(nextKeywords);
	};

	// 전체 검색어 삭제
	const removeAllKeywords = () => {
		setItem([]);
	};

	return {
		getItem,
		addKeyword,
		removeKeyword,
		removeAllKeywords,
		storedValue,
		handleSubmitKeyword, // 변경된 부분: handleSubmitKeyword 추가
	};
};
