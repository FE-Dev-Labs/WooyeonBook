'use client';
import { getUser } from '@/apis/community/getUser';
import { createClient } from '@/utils/supabase/client';
import { useRouter } from 'next/navigation';

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
		console.log(user_id);

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

	return <button onClick={onSubmit}>♡ {like?.length}</button>;
};

export default LikeBtn;
