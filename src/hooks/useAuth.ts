import { zipcodeAtom } from '@/recoil/atom/signupAtom';
import { emailRegex, nameRegex, passwordRegex } from '@/utils/userRegex';
import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';

const useAuth = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [checkPassword, setCheckPassword] = useState<string>('');
	const [phone, setPhone] = useState<string>('');
	const [zipcode, setZipcode] = useRecoilState(zipcodeAtom);
	const nameRef = useRef<HTMLInputElement | null>(null);
	const emailRef = useRef<HTMLInputElement | null>(null);
	const passwordRef = useRef<HTMLInputElement | null>(null);
	const confirmPasswordRef = useRef<HTMLInputElement | null>(null);
	const phoneRef = useRef<HTMLInputElement | null>(null);
	const zipcodeRef = useRef<HTMLInputElement | null>(null);

	// 이름 변경
	const [newUserNameInput, setNewUserNameInput] = useState<string>('');
	const nickNameRef = useRef<HTMLInputElement | null>(null);

	// 이름 입력받는 함수
	const changeName = (e: React.ChangeEvent<HTMLInputElement>) => {
		setName(e.target.value);
	};

	// 이메일 입력받는 함수
	const changeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};

	// 비밀번호 입력받는 함수
	const changePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	// 비밀번호 다시 입력하는 함수
	const changeConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCheckPassword(e.target.value);
	};

	// 핸드폰 입력받는 함수
	const changePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPhone(e.target.value);
	};

	// 주소 입력받는 함수
	const changeZipcode = (e: React.ChangeEvent<HTMLInputElement>) => {
		setZipcode(e.target.value);
	};

	// 로그인 유효성 검사하는 함수
	const checkLoginValidation = () => {
		const checkEmailValidation = email.match(emailRegex);
		const checkPasswordValidation = password.match(passwordRegex);

		// 이메일
		if (!email || !checkEmailValidation) {
			if (!email) {
				alert('이메일을 입력해주세요.');
				if (emailRef.current) emailRef.current.focus();
				return false;
			} else {
				alert('이메일 형식을 올바르게 입력해주세요');
				if (emailRef.current) emailRef.current.focus();
				return false;
			}
		}

		// 비밀번호 유효성 검사
		if (!password || !checkPasswordValidation) {
			if (!password) {
				alert('비밀번호를 입력해주세요');
				if (passwordRef.current) passwordRef.current.focus();
				return false;
			} else {
				alert('비밀번호는 영문, 숫자 포함 6자 이상이어야 합니다.');
				if (passwordRef.current) passwordRef.current.focus();
				setPassword('');
				return false;
			}
		}
		return true;
	};

	// 회원가입 유효성 검사하는 함수
	const checkValidation = () => {
		const checkEmailValidation = email.match(emailRegex);
		const checkPasswordValidation = password.match(passwordRegex);

		// 이름
		const checkNameValidation = name.match(nameRegex);
		if (!name || !checkNameValidation) {
			if (!name) {
				alert('이름을 입력해주세요.');
				if (nameRef.current) nameRef.current.focus();
				return false;
			} else {
				alert('한글 3글자 이상 입력해 주세요.');
				if (nameRef.current) nameRef.current.focus();
				return false;
			}
		}

		// 이메일
		if (!email || !checkEmailValidation) {
			if (!email) {
				alert('이메일을 입력해주세요.');
				if (emailRef.current) emailRef.current.focus();
				return false;
			} else {
				alert('이메일 형식을 올바르게 입력해주세요');
				if (emailRef.current) emailRef.current.focus();
				return false;
			}
		}

		// 비밀번호 유효성 검사
		if (!password || !checkPasswordValidation) {
			if (!password) {
				alert('비밀번호를 입력해주세요');
				if (passwordRef.current) passwordRef.current.focus();
				return false;
			} else {
				alert('비밀번호는 영문, 숫자 포함 6자 이상이어야 합니다.');
				if (passwordRef.current) passwordRef.current.focus();
				setPassword('');
				return false;
			}
		}

		// 비밀번호 일치여부 확인 함수
		if (!checkPassword) {
			alert('비밀번호를 다시 한번 더 입력해주세요.');
			if (confirmPasswordRef.current) confirmPasswordRef.current.focus();
			return false;
		}
		if (password !== checkPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			if (confirmPasswordRef.current) confirmPasswordRef.current.focus();
			setCheckPassword('');
			return false;
		}
		// 핸드폰 유효성 검사
		if (!phone) {
			alert('핸드폰 번호를 입력해주세요.');
			if (phoneRef.current) phoneRef.current.focus();
			return false;
		}

		// 주소 유효성 검사
		if (!zipcode) {
			alert('주소를 입력해주세요.');
			if (zipcodeRef.current) zipcodeRef.current.focus();
			return false;
		}
		return true;
	};

	//--------------------------------------------------------//

	// 이름 유효성 검사 함수
	const checkUserNameValidation = () => {
		const checkNameValidation = name.match(nameRegex);
		if (!name || !checkNameValidation) {
			if (!name) {
				alert('이름을 입력해주세요.');
				if (nameRef.current) nameRef.current.focus();
				return false;
			} else {
				alert('한글 3글자 이상 입력해 주세요.');
				if (nameRef.current) nameRef.current.focus();
				return false;
			}
		}
		return true;
	};

	// 비밀번호 일치여부 확인하는 함수
	const checkValidationForSignUp = () => {
		if (!checkPassword) {
			alert('비밀번호를 다시 한번 더 입력해주세요.');
			if (confirmPasswordRef.current) confirmPasswordRef.current.focus();
			return false;
		}
		if (password !== checkPassword) {
			alert('비밀번호가 일치하지 않습니다.');
			if (confirmPasswordRef.current) confirmPasswordRef.current.focus();
			setCheckPassword('');
			return false;
		}
		return true;
	};

	// 이메일 유효성 검사 함수
	const checkPhoneValidation = () => {
		if (!phone) {
			alert('핸드폰 번호를 입력해주세요.');
			if (phoneRef.current) phoneRef.current.focus();
			return false;
		}
		return true;
	};

	return {
		name,
		phone,
		email,
		setEmail,
		password,
		setPassword,
		changeName,
		newUserNameInput,
		setNewUserNameInput,
		zipcode,
		setZipcode,
		zipcodeRef,
		nameRef,
		emailRef,
		passwordRef,
		phoneRef,
		confirmPasswordRef,
		nickNameRef,
		changeEmail,
		changePassword,
		changePhone,
		changeConfirmPassword,
		checkUserNameValidation,
		checkValidation,
		checkValidationForSignUp,
		checkPhoneValidation,
		checkLoginValidation,
		changeZipcode,
	};
};

export default useAuth;
