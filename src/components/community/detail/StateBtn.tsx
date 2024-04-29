'use client';

import { getUser } from '@/apis/community/getUser';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

const StateBtn = ({
	page,
	doc_id,
	state,
	admin,
	selling,
}: {
	page: string;
	doc_id: string;
	state: boolean;
	admin: string;
	selling?: boolean;
}) => {
	const router = useRouter();
	if (page === 'bookReport') {
		return null;
	}
	if (page === 'bookSelling' && selling === false) {
		return null;
	}

	const text = () => {
		switch (page) {
			case 'bookSelling':
				return state ? '판매 완료' : '판매중';
			case 'bookMeeting':
				return state ? '모집 완료' : '모집중';
			case 'bookBuying':
				return state ? '구매 완료' : '구매중';
		}
	};
	const onSubmit = async () => {
		const { user_id } = await getUser();

		if (user_id === undefined) {
			router.push('/login');
		} else if (user_id !== admin) {
			alert('작성자만 수정할 수 있습니다.');
		} else {
			onChangeLike();
		}
	};
	const onChangeLike = async () => {
		const supabase = createClient();

		const { error } = await supabase
			.from(page)
			.update({ state: !state })
			.eq('doc_id', doc_id)
			.select();
		window.location.reload();
	};
	return <button onClick={onSubmit}>{text()}</button>;
};

export default StateBtn;
