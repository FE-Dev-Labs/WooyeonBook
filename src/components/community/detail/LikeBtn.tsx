'use client';
import { getUser } from '@/apis/community/getUser';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';
import styles from '@/styles/community/detail/DetailPage.module.css';
import Image from 'next/image';
import heartIcon from '../../../../public/common/BsHeart.png';
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
	const onSubmit = async () => {
		const { user_id } = await getUser();

		if (user_id === undefined) {
			router.push('/login');
		} else {
			onChangeLike();
		}
	};
	const onChangeLike = async () => {
		const supabase = createClient();
		const { user_id } = await getUser();

		if (like.includes(user_id as string)) {
			const { error } = await supabase
				.from(page)
				.update({ like_users: like.filter((id) => id !== user_id) })
				.eq('doc_id', doc_id)
				.select();
			window.location.reload();
		} else {
			const { error } = await supabase
				.from(page)
				.update({ like_users: [...like, user_id] })
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
