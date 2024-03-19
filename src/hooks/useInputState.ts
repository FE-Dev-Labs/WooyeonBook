import { useCallback, useState } from 'react';

export const useInputState = (initValue: string | number | Date) => {
	const [value, setValue] = useState<string | number | Date>(initValue);

	const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
		setValue(e.target.value);
	}, []);

	const init = (value: string | number | Date) => {
		setValue(value);
	};

	const onChangeValue = useCallback((data: string | number | Date) => {
		setValue(data);
	}, []);

	return { value, setValue, onChange, init, onChangeValue };
};
