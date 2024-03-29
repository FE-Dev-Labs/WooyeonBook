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

	// 컴포넌트가 마운트 될 때 getItem을 호출하여 상태를 초기화합니다.
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
			// 이 함수는 로컬 스토리지의 현재 상태를 가져옵니다.
			const currentStoredValue = getItem();

			// 현재 저장된 키워드 목록에 이미 해당 키워드가 존재하는지 확인
			if (!currentStoredValue.includes(keyword)) {
				// 존재하지 않는 경우, 새로운 키워드 추가
				// 새로운 키워드를 추가하기 전에 현재 저장된 키워드의 배열을 복사하고,
				// 최신 검색어가 배열의 앞쪽에 오도록 한다.
				// 여기서는 최대 10개의 이전 검색어만 유지하고, 새로운 검색어를 추가함
				const newKeywords = [keyword, ...currentStoredValue.slice(0, 10)];
				setItem(newKeywords); // 이 함수는 새로운 상태를 로컬 스토리지에 저장합니다.
			} else {
				console.error('Keyword already exists:', keyword);
			}
		} else {
			console.error('Invalid keyword:', keyword);
		}
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
	};
};
