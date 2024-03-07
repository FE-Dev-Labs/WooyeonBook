import { useCallback, useState } from 'react';

export const useInputState = (initValue: string | number | Date) => {
	const [value, setValue] = useState<string | number | Date>('');

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const init = () => {
		setValue(initValue);
	};

	return { value, onChange, init };
};
