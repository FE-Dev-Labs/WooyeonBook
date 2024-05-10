'use client';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import styles from '@/styles/community/detail/detailPage.module.css';
import Image from 'next/image';
import heartIcon from '@/assets/common/heartIcon.png';
import { useRecoilValue } from 'recoil';
import { userAtom } from '@/recoil/atom/userAtom';
const LikeBtn = ({
	page,
	doc_id,
	like,
}: {
	page: string;
	doc_id: string;
	like: string[];
}) => {
	const router = useRouter();
	const userInfo = useRecoilValue(userAtom);
	const onSubmit = async () => {
		if (userInfo.id === null) {
			router.push('/login');
		} else {
			onChangeLike();
		}
	};
	const onChangeLike = async () => {
		const supabase = createClient();

		if (like.includes(userInfo.id as string)) {
			const { error } = await supabase
				.from(page)
				.update({ like_users: like.filter((id) => id !== userInfo.id) })
				.eq('doc_id', doc_id)
				.select();
			window.location.reload();
		} else {
			const { error } = await supabase
				.from(page)
				.update({ like_users: [...like, userInfo.id] })
				.eq('doc_id', doc_id)
				.select();
			window.location.reload();
		}
	};

	return (
		<div className={styles.likeBtnWrap} onClick={onSubmit}>
			<button className={styles.likeBtn}>
				<Image
					src={heartIcon}
					alt="heartIcon"
					width={17}
					height={17}
					className={styles.iconsStyle}
				/>
				<span className={styles.likeCountText}>{like?.length}</span>
			</button>
		</div>
	);
};

export default LikeBtn;
