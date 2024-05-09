'use client';

import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import styles from '@/styles/community/detail/detailPage.module.css';
import { useState } from 'react';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';
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
	const [loading, setLoading] = useState(false);
	const user = useRecoilValue(userAtom);

	const text = () => {
		switch (page) {
			case 'bookSelling':
				return selling
					? state
						? '판매 완료'
						: '판매중'
					: state
						? '나눔 완료'
						: '나눔중';
			case 'bookMeeting':
				return state ? '모집 완료' : '모집중';
			case 'bookBuying':
				return state ? '구매 완료' : '구매중';
		}
	};
	const onSubmit = async () => {
		if (user.id === null) {
			router.push('/login');
		} else if (user.id !== admin) {
			alert('작성자만 수정할 수 있습니다.');
		} else {
			onChangeLike();
		}
	};
	const onChangeLike = async () => {
		setLoading(true);
		const supabase = createClient();

		const { error } = await supabase
			.from(page)
			.update({ state: !state })
			.eq('doc_id', doc_id)
			.select();
		setLoading(false);
		window.location.reload();
	};
	return (
		<>
			{loading ? (
				<LoadingSpinner />
			) : (
				<div className={styles.stateBtnWrapper}>
					<div className={styles.stateBtnWrap} onClick={onSubmit}>
						<span className={styles.stateBtnText}>{text()}</span>
					</div>
				</div>
			)}
		</>
	);
};

export default StateBtn;
