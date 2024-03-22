'use client';

import Detailcommentslist from './Detailcommentslist';
import styles from '@/styles/detail/detailcomments/detailcomment.module.css';
import { useEffect, useState } from 'react';
import { createClient } from '@/utils/supabase/client';

export default function Detailcomment() {
	const supabase = createClient();

	const getUser = async () => {
		const {
			data: { user },
		} = await supabase.auth.getUser();
		return console.log(user);
	};
	const [isLogin, setIsLogin] = useState(false);

	useEffect(() => {
		getUser();

		if (document.cookie === null || document.cookie === '') {
			setIsLogin(false);
		} else {
			setIsLogin(true);
		}
	}, []);

	return (
		<>
			{isLogin && (
				<form className={styles.commentForm}>
					<input
						className={styles.commentInput}
						type="text"
						placeholder="한글 기준 50자까지 작성 가능합니다."
					/>
					<button className={styles.commnetSubmitBtn}>등록</button>
				</form>
			)}
			<div>
				<ul>
					{/*코멘트 list map 돌리는 부분 */}
					<Detailcommentslist />
					<Detailcommentslist />
				</ul>
			</div>
		</>
	);
}
